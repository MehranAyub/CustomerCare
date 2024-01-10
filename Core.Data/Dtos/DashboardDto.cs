namespace TheShopWebApi.Dtos
{
    public class DashboardDto
    {
        public int Orders { get; set; }
        public int CancelledOrders { get; set; }
        public int ApprovedOrders { get; set; }
        public int PendingOrders { get; set; }
        public int Customers { get; set; }
        public int DeliveredOrders { get; set; }
        public int Products { get; set; }

    }
}
