using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using KioskManager_Backend.Models;





// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Kisosk_Manager_Backend.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        SqlConnection con = new SqlConnection("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Test;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        // GET: api/<UsersController>
        [HttpGet]
        public string Get()
        {
            //return new string[] { "value1", "value2" };
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM dbo.Users", con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                return JsonConvert.SerializeObject(dt);
            }
            else
            {
                return "no data";
            }
        }
        [HttpGet]
        [Route("GetTickets")]
        public string GetTickets()
        {
            //return new string[] { "value1", "value2" };
            SqlDataAdapter da2 = new SqlDataAdapter("SELECT * FROM dbo.Tickets", con);
            DataTable dt2 = new DataTable();
            da2.Fill(dt2);
            if (dt2.Rows.Count > 0)
            {
                return JsonConvert.SerializeObject(dt2);
            }
            else
            {
                return "no data";
            }
        }

        [HttpPost]
        [Route("NewTicket")]
        public string NewTicket(ticketModel ticketModel)
        {
            //return value + "successful"
            SqlCommand cmd = new SqlCommand("Insert into dbo.Tickets(Title, Description) VALUES ('" + ticketModel.Title + "', '" + ticketModel.Description + "')", con);
            con.Open();

            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i == 1)
            {
                return "data inserted";
            }
            else
            {
                return "try again";
            }
        }
        [HttpDelete]
        [Route("DeleteTicket")]
        public string DeleteTicket(int ID)
        {
            //return value + "successful"
            SqlCommand cmdd = new SqlCommand("DELETE FROM dbo.Tickets WHERE ID ='" + ID + "'", con);
            con.Open();

            int i = cmdd.ExecuteNonQuery();
            con.Close();
            if (i == 1)
            {
                return "data deleted";
            }
            else
            {
                return "try again " + ID;
            }
        }
        [HttpGet]
        [Route("GetArchive")]
        public string GetArchive()
        {
            //return new string[] { "value1", "value2" };
            SqlDataAdapter da2 = new SqlDataAdapter("SELECT * FROM dbo.Archive", con);
            DataTable dt2 = new DataTable();
            da2.Fill(dt2);
            if (dt2.Rows.Count > 0)
            {
                return JsonConvert.SerializeObject(dt2);
            }
            else
            {
                return "no data";
            }
        }

        [HttpPost]
        [Route("NewArchive")]
        public string NewArchive(ticketModel ticketModel)
        {
            //return value + "successful"
            SqlCommand cmd = new SqlCommand("Insert into dbo.Archive(Title, Description) VALUES ('" + ticketModel.Title + "', '" + ticketModel.Description + "')", con);
            con.Open();

            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i == 1)
            {
                return "data inserted";
            }
            else
            {
                return "try again";
            }
        }
        [HttpDelete]
        [Route("DeleteArchive")]
        public string DeleteArchive(int ID)
        {
            //return value + "successful"
            SqlCommand cmdd = new SqlCommand("DELETE FROM dbo.Archive WHERE ID ='" + ID + "'", con);
            con.Open();

            int i = cmdd.ExecuteNonQuery();
            con.Close();
            if (i == 1)
            {
                return "data deleted";
            }
            else
            {
                return "try again " + ID;
            }
        }
        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UsersController>
        [HttpPost]
        [Route("registration")]
        public string registration(userModel userModel)
        {
            //return value + "successful"
            SqlCommand cmd = new SqlCommand("Insert into dbo.Users(USERNAME, PASSWORD, ROLE) VALUES ('" + userModel.UserName + "', '" + userModel.Password + "', 'user' )", con);
            con.Open();

            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i == 1)
            {
                return "data inserted";
            }
            else
            {
                return "try again";
            }
        }
        [HttpPost]
        [Route("signin")]
        public string signin(userModel userModel)
        {
            SqlDataAdapter da = new SqlDataAdapter("SELECT * FROM dbo.Users WHERE USERNAME = '" + userModel.UserName + "' AND PASSWORD = '" + userModel.Password + "' AND ROLE = '"+userModel.Role+"' ", con);
            con.Open();
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                return "admin";
            }
            else
            {
                SqlDataAdapter da2 = new SqlDataAdapter("SELECT * FROM dbo.Users WHERE USERNAME = '" + userModel.UserName + "' AND PASSWORD = '" + userModel.Password + "'  ", con);
                
                DataTable dt2 = new DataTable();
                da2.Fill(dt2);
                if (dt2.Rows.Count > 0)
                {
                    return "user";
                }
                else
                {
                   
                    return "invalid user";
                }
               
            }
        }


        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}