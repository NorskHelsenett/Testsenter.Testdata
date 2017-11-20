using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using Shared.Common.Logic;

namespace TestdataApp.ExampleProject.Config.Mock
{
    public enum QuantifiedAge
    {
        [Description("0")]
        AgeLevel1 = 0,

        [Description("2")]
        AgeLevel2 = 1,

        [Description("6")]
        AgeLevel3 = 2,

        [Description("12")]
        AgeLevel4 = 3,

        [Description("16")]
        AgeLevel5 = 4,

        [Description("19")]
        AgeLevel6 = 5,

        [Description("30")]
        AgeLevel7 = 6,

        [Description("60")]
        AgeLevel8 = 7
    }

    public static class QuantifyAge
    {
        public static string GetAgeLevel(int age)
        {
            var previous = "";

            foreach (var ageMin in Quants.Keys)
            {
                if (string.IsNullOrEmpty(previous))
                {
                    previous = Quants[ageMin];
                    continue;
                }

                if (age < ageMin)
                    return previous;

                previous = Quants[ageMin];
            }

            return Quants.Last().Value;
        }

        public static IEnumerable<QuantifiedAge> GetQuantifiedAges()
        {
            return Enum.GetValues(typeof(QuantifiedAge)).Cast<QuantifiedAge>();
        }

        private static Dictionary<int, string> _quants;
        public static Dictionary<int, string> Quants
        {
            get
            {
                if (_quants != null)
                    return _quants;

                _quants = new Dictionary<int, string>();

                foreach (var @enum in GetQuantifiedAges())
                {
                    var description = @enum.ToDescription();
                    _quants.Add(int.Parse(description), @enum.ToString());
                }

                return _quants;
            }
        }
    }
}