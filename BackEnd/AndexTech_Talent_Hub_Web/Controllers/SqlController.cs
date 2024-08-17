using Microsoft.AspNetCore.Mvc;

using System.Data.SqlClient;

namespace AndexTech_Talent_Hub_Web.Controllers
{
    [ApiController]
    [Route("api/sql")]
    public class SqlController : ControllerBase
    {
        private readonly string _connectionString;
        public class SqlResult
        {
            public int id { get; set; }
            public string description { get; set; }
        }

        public SqlController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("SecondConnection");
        }
        [HttpPost]
        public IActionResult ExecuteSQL([FromBody] string sqlQuery)
        {
            try
            {
                List<SqlResult> results = new List<SqlResult>();

                using (SqlConnection connection = new SqlConnection(_connectionString))
                {
                    connection.Open();
                    using (SqlCommand command = new SqlCommand(sqlQuery, connection))
                    {
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                // Créer un nouvel objet SqlResult pour chaque ligne de résultat
                                SqlResult result = new SqlResult
                                {
                                    // Assumer que la première colonne est l'ID et la deuxième colonne est la description
                                    id = Convert.ToInt32(reader[0]),
                                    description = reader[1].ToString()
                                };
                                results.Add(result);
                            }
                        }
                    }
                }

                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest($"Erreur lors de l'exécution de la requête SQL : {ex.Message}");
            }
        }
    }
    }
