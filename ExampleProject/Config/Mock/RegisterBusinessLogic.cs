using System;
using TestdataApp.Common.Models.Common;

namespace TestdataApp.ExampleProject.Config.Mock
{
    public class RegisterBusinessLogic : RegisterBusinessModel
    {
        public static RegisterBusinessModel Merge(RegisterBusinessModel registerBusinessLogic, RegisterBusinessModel entity, bool b)
        {
            return registerBusinessLogic;
        }

        private static string Merge(string a, string b, bool isAMasterIfValuesAreDifferent)
        {
            if (String.IsNullOrEmpty(a))
            {
                return String.IsNullOrEmpty(b) ? null : b;
            }

            if (String.IsNullOrEmpty(b))
                return a;

            return isAMasterIfValuesAreDifferent ? a : b;
        }
    }
}