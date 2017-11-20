using System.Collections.Generic;
using System.Linq;

namespace TestdataApp.Common.Search
{
    public class HitResult
    {
        public HitResult()
        {
            Hits = new List<Hit>();
        }

        public HitResult(Hit hit)
            : this()
        {
            Hits.Add(hit);
        }

        public HitResult(IEnumerable<Hit> hits)
        {
            Hits = hits.ToList();
        }

        public List<Hit> Hits { get; set; }
    }
}
