using Contactly.Data;
using Contactly.Model.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Contactly.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactlyDbContext dbContext;
        public ContactController(ContactlyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        [HttpGet]
        public IActionResult GetContact()
        {
            var contacts = dbContext.Contacts.ToList();
            return Ok(contacts);
        }
        [HttpPost]
        public IActionResult AddContact(AddContactDTO addDto)
        {
            var contact = new Contact
            {
                Id = Guid.NewGuid(),
                Name = addDto.Name,
                Email = addDto.Email,
                Phone = addDto.Phone,
                Favorite = addDto.Favorite,
            };
           dbContext.Contacts.Add(contact);
            dbContext.SaveChanges();
            return Ok(contact);
        }
        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteContact(Guid id) { 
            var contact = dbContext.Contacts.Find(id);
            if (contact is not null) { 
               dbContext.Contacts.Remove(contact);
                dbContext.SaveChanges();
            }
           return Ok();
        }
    }
}
