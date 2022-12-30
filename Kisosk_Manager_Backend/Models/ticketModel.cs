namespace KioskManager_Backend.Models
{
    public class ticketModel
    {
        public int Id { get; set; }
       
        public string Title { get; set; }
        public string Owner { get; set; }
        public string Description { get; set; }

        public string Type { get; set; }
    }
}
