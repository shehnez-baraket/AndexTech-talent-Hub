using Xunit;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json;
using System.Text;
using AndexTech_Talent_Hub_Bibliotheque.Models;

namespace Test
{
    public class QuestionControllerTests : IClassFixture<WebApplicationFactory<AndexTech_Talent_Hub_Web.Startup>>
    {
        private readonly WebApplicationFactory<AndexTech_Talent_Hub_Web.Startup> _factory;

        public QuestionControllerTests(WebApplicationFactory<AndexTech_Talent_Hub_Web.Startup> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task GetQuestions_ReturnsOkResult()
        {
            // Arrange
            var client = _factory.CreateClient();

            // Act
            var response = await client.GetAsync("/api/Question");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async Task GetQuestionById_ReturnsOkResult()
        {
            // Arrange
            var client = _factory.CreateClient();
            int questionId = 2010; // Change to the desired question ID

            // Act
            var response = await client.GetAsync($"/api/Question/{questionId}");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        /*
        public async Task PostQuestion_ReturnsCreatedResult()
        {
            // Arrange
            var client = _factory.CreateClient();
            var newQuestion = new Question {  Populate with new question data  };

        
            var response = await client.PostAsync("/api/Question",
                new StringContent(JsonConvert.SerializeObject(newQuestion), Encoding.UTF8, "application/json"));

           
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }*/
        public async Task PostQuestion_ReturnsCreatedResult()
        {
            // Arrange
            var client = _factory.CreateClient();
            var newQuestion = new Question
            {
            
                Texte = "Votre question ici",
                Niveau = Niveau.Intermédiaire, // ou Moyen, Difficile selon votre logique
                Domaine = "Test",
                Option = new List<Option>
        {
            new Option { Texte = "Option 1", EstCorrect = true },
            new Option { Texte = "Option 2", EstCorrect = false },
            // Ajoutez d'autres options si nécessaire
        }
            };

            // Act
            var response = await client.PostAsync("/api/Question",
                new StringContent(JsonConvert.SerializeObject(newQuestion), Encoding.UTF8, "application/json"));

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }

        [Fact]
        public async Task PutQuestion_ReturnsNoContentResult()
        {
            // Arrange
            var client = _factory.CreateClient();
            int questionId = 2008; // Change to the desired question ID
            var updatedQuestion = new Question
            {
                Texte = "Texte mis à jour",
                Niveau = Niveau.Avancé, // ou Moyen, selon votre logique
                Domaine = "Domaine mis à jour",
                Option = new List<Option>
        {
            new Option { Texte = "Nouvelle option 1", EstCorrect = true },
            new Option { Texte = "Nouvelle option 2", EstCorrect = false },
            // Ajoutez d'autres options mises à jour si nécessaire
        }
            };

            // Act
            var response = await client.PutAsync($"/api/Question/{questionId}",
                new StringContent(JsonConvert.SerializeObject(updatedQuestion), Encoding.UTF8, "application/json"));

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }


        [Fact]
        public async Task DeleteQuestion_ReturnsNoContentResult()
        {
            // Arrange
            var client = _factory.CreateClient();
            int questionId = 2004; // Change to the desired question ID

            // Act
            var response = await client.DeleteAsync($"/api/Question/{questionId}");

            // Assert
            response.EnsureSuccessStatusCode(); // Status Code 200-299
        }
    }
}
