using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class commentcreatedby : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "380b2f37-9cba-47c2-b1c4-f0222a1ac8b2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "49f1d020-ae53-466f-84f8-b4dd91276d26");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a76b4b02-f96e-47b4-a875-659be32da97a", null, "User", "USER" },
                    { "c1b29682-e4b0-48e1-973e-c4af16a2045e", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a76b4b02-f96e-47b4-a875-659be32da97a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "c1b29682-e4b0-48e1-973e-c4af16a2045e");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "380b2f37-9cba-47c2-b1c4-f0222a1ac8b2", null, "Admin", "ADMIN" },
                    { "49f1d020-ae53-466f-84f8-b4dd91276d26", null, "User", "USER" }
                });
        }
    }
}
