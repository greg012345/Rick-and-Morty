using System.ComponentModel.DataAnnotations;

namespace Charachter.Model
{
    public class Charter
    {
        public int id { get; set; }

        [Required(ErrorMessage = "name is requird")]
        public string name { get; set; }

        [Required(ErrorMessage = "image name is requird")]
        public string image { get; set; }

        [Required(ErrorMessage = "status is requird")]
        public string status { get; set; }

        [Required(ErrorMessage = "species number is requird")]
        public string species { get; set; }

        [Required(ErrorMessage = "gender name is requird")]
        public string gender { get; set; }

        [Required(ErrorMessage = "createdBy name is requird")]
        public string createdBy { get; set; }
    }
}
