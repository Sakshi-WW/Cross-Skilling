using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class PortfolioManyToMany : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2c07786a-e551-45c3-8a08-fbc1d5cefb1b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9d78a585-e9b5-41d6-85ff-c41f70c574c8");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8ccbd23f-df1c-4f21-82bd-7d57f6dd69d4", null, "User", "User" },
                    { "cbe7b9c0-29f9-4529-806c-625baf72c29b", null, "Admin", "Admin" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8ccbd23f-df1c-4f21-82bd-7d57f6dd69d4");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cbe7b9c0-29f9-4529-806c-625baf72c29b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2c07786a-e551-45c3-8a08-fbc1d5cefb1b", null, "Admin", "Admin" },
                    { "9d78a585-e9b5-41d6-85ff-c41f70c574c8", null, "User", "User" }
                });
        }
    }
}
