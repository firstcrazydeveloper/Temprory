namespace PACEWebApiCore.Entities
{
    public class TeamLiaison : BaseEntity
    {
        public int TeamId { get; set; }
        public int UserId { get; set; }
    }
}