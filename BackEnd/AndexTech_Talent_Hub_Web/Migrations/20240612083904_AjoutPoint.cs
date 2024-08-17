using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AndexTech_Talent_Hub_Web.Migrations
{
    /// <inheritdoc />
    public partial class AjoutPoint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Point",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Point",
                table: "Questionnaires",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Point",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "Point",
                table: "Questionnaires");
        }
    }
}
