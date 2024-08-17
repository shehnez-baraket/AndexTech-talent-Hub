using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Basic.Reference.Assemblies;

namespace AndexTech_Talent_Hub_Web.Controllers
{
    public class CodeRequest
    {
        public string Code { get; set; }
    }
    [ApiController]
    [Route("api/code")]
    public class CodeController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> AnalyzeCode([FromBody] CodeRequest request)
        {
            try
            {
                var result = await CompileAndExecuteCodeAsync(request.Code);
                var complexity = CalculateComplexity(request.Code);
                var lineCount = CalculateLineCount(request.Code);
                return Ok(new { ExecutionResult = result, Complexity = complexity, LineCount = lineCount });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while analyzing the code: {ex.Message}");
            }
        }


        private async Task<string> CompileAndExecuteCodeAsync(string code)
        {
            try
            {
                var methodName = "Main"; // Change the method name to Main
                var runMethodCode = @"
            using System;

            public partial class Program
            {
                static void Main()
                {
                    // Add your dynamic code here
                    Console.WriteLine(""Dynamic code executed."");
                }
            }
            ";

                // Create a syntax tree from the provided code
                var syntaxTree = CSharpSyntaxTree.ParseText(runMethodCode);

                // Define necessary references
                var references = new[]
{
    MetadataReference.CreateFromFile(typeof(object).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(Console).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(Enumerable).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(System.Linq.Expressions.Expression).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(System.Collections.Generic.List<>.Enumerator).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(System.Collections.Generic.KeyValuePair<, >).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(System.Runtime.Versioning.TargetFrameworkAttribute).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(System.Threading.Tasks.Task).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(System.Reflection.MethodInfo).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(System.Linq.Queryable).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(System.RuntimeFieldHandle).Assembly.Location),
    MetadataReference.CreateFromFile(typeof(object).Assembly.Location.Replace("mscorlib.dll", "System.Runtime.dll")),
    MetadataReference.CreateFromFile(typeof(Enumerable).Assembly.Location.Replace("System.Core.dll", "System.Runtime.Extensions.dll"))
};

                // Create compilation options
                var compilationOptions = new CSharpCompilationOptions(OutputKind.ConsoleApplication);

                // Create compilation
                var compilation = CSharpCompilation.Create("DynamicCode")
                    .WithOptions(compilationOptions)
                    .AddReferences(references)
                    .AddSyntaxTrees(syntaxTree);

                // Emit assembly to memory stream
                using (var ms = new MemoryStream())
                {
                    var emitResult = compilation.Emit(ms);

                    if (!emitResult.Success)
                    {
                        var errorMessages = emitResult.Diagnostics
                            .Where(diagnostic => diagnostic.Severity == DiagnosticSeverity.Error)
                            .Select(diagnostic => diagnostic.GetMessage());

                        return $"An error occurred while compiling the code:{Environment.NewLine}{string.Join(Environment.NewLine, errorMessages)}";
                    }

                    ms.Seek(0, SeekOrigin.Begin);

                    // Load assembly from memory stream
                    var assembly = Assembly.Load(ms.ToArray());

                    // Check if the assembly contains a type named "Program"
                    if (assembly.GetType("Program") == null)
                    {
                        return "The assembly does not contain a type named 'Program'.";
                    }

                    // Get and invoke the method
                    var type = assembly.GetType("Program");
                    var method = type.GetMethod(methodName);

                    if (method == null)
                    {
                        return $"The type 'Program' does not contain a method named '{methodName}'.";
                    }

                    method.Invoke(null, null);

                    return "Code executed successfully.";
                }
            }
            catch (Exception ex)
            {
                return $"An error occurred while executing the code: {ex.Message}";
            }
        }

        private int CalculateComplexity(string code)
        {
            // Parse the code and calculate its complexity
            SyntaxTree syntaxTree = CSharpSyntaxTree.ParseText(code);
            CompilationUnitSyntax root = syntaxTree.GetCompilationUnitRoot();

            // Implement your logic to calculate complexity here
            // For example, count the number of loops, conditions, etc.
            int complexity = CountLoops(root) + CountConditions(root);

            return complexity;
        }

        private int CalculateLineCount(string code)
        {
            // Split the code into lines and count them
            string[] lines = code.Split('\n');
            return lines.Length;
        }

        private int CountLoops(CompilationUnitSyntax root)
        {
            // Count the number of loops (for, foreach, while)
            return root.DescendantNodes().OfType<ForStatementSyntax>().Count() +
                   root.DescendantNodes().OfType<ForEachStatementSyntax>().Count() +
                   root.DescendantNodes().OfType<WhileStatementSyntax>().Count();
        }

        private int CountConditions(CompilationUnitSyntax root)
        {
            // Count the number of conditions (if, else, switch, case)
            return root.DescendantNodes().OfType<IfStatementSyntax>().Count() +
                   root.DescendantNodes().OfType<SwitchStatementSyntax>().Count();
            // Add other types of conditions as needed
        }
    }
}