namespace KioskManager_Backend.Models
{
    public class locationModel
    {
        public int Id { get; set; }
        public string TempName { get; set; }
        public string TempDesc { get; set; }
        public string FileUploadName { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string TempCode { get; set; }
        public string LeaseStart { get; set; }
        public string LeaseEnd { get; set; }
        public decimal FxF { get; set; }
        public decimal FxT { get; set; }
        public decimal FxFT { get; set; }
        public decimal TxT { get; set; }
        public decimal TxFT { get; set; }
        public decimal TxTW { get; set; }
        public decimal TxTWF { get; set; }
        public decimal TxTH { get; set; }
        public decimal Car { get; set; }
        public string Insurance { get; set; }
    }
}
