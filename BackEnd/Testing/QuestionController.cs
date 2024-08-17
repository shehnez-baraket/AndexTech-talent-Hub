using AndexTech_Talent_Hub_Web.Controllers;
using AndexTech_Talent_Hub_Bibliotheque.Models;
using Moq;
using Microsoft.AspNetCore.Mvc;
using AndexTech_Talent_Hub_Web.Repositories;

using Xunit;

namespace Testing
{
    [Fact]
    public class QuestionControllerTests
    {
        private QuestionController _controller;
        private Mock<IQuestionRepository> _questionRepositoryMock;

        [SetUp]
        public void Setup()
        {
            // Initialisez le mock du repository
            _questionRepositoryMock = new Mock<IQuestionRepository>();

            // Initialisez le contrôleur en lui passant le mock du repository
            _controller = new QuestionController(_questionRepositoryMock.Object);
        }

        [Test]
        public async Task GetQuestions_ReturnsOkResult_WithQuestions()
        {
            // Arrange
            var questions = new List<Question> { new Question { QuestionId = 1, Texte = "Sample question" } };
            _questionRepositoryMock.Setup(repo => repo.GetQuestionsAsync()).ReturnsAsync(questions);

            // Act
            var result = await _controller.GetQuestions();

            // Assert
            ClassicAssert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            var returnedQuestions = okResult.Value as List<Question>;
            ClassicAssert.AreEqual(1, returnedQuestions.Count);
            ClassicAssert.AreEqual("Sample question", returnedQuestions[0].Texte);
        }
    }
}
