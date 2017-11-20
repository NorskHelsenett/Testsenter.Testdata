using System;
using System.Collections.Generic;
using System.Linq;
using TestdataApp.Common.Models.Common;

namespace TestdataApp.ExampleProject.Config.Mock
{
    public class RegisterPersonLogic: RegisterPersonModel
    {
        public static string VikarKey = "LPVI";
        public static string DeleLegeKey = "LPDL";
        public static string NormalFastlegeKey = "LPFL";
        public const string NoDoctorKey = "NOTHIN";

        public static List<RegisterPersonModel> Merge(IEnumerable<RegisterPersonModel> setA, IEnumerable<RegisterPersonModel> setB, bool isAMasterIfValuesAreDifferent)
        {
            var aDic = setA.ToDictionary(x => x.CommonIdentifier, y => y);
            var result = new List<RegisterPersonModel>();
            var aTaken = new HashSet<string>();

            foreach (var personB in setB)
            {
                if (aDic.ContainsKey(personB.CommonIdentifier))
                {
                    result.Add(Merge(aDic[personB.CommonIdentifier], personB, isAMasterIfValuesAreDifferent));
                    aTaken.Add(personB.CommonIdentifier);
                }
                else
                {
                    result.Add(personB);
                }
            }

            foreach (var personA in aDic.Keys.Where(key => aTaken.All(x => x != key)))
            {
                result.Add(aDic[personA]);
            }

            return result;
        }

        public static RegisterPersonLogic Merge(RegisterPersonModel a, RegisterPersonModel b, bool isAMasterIfValuesAreDifferent)
        {
            return new RegisterPersonLogic
            {
                CommonIdentifier = Merge(a.CommonIdentifier, b.CommonIdentifier, isAMasterIfValuesAreDifferent),
                AdresseKode = Merge(a.AdresseKode, b.AdresseKode, isAMasterIfValuesAreDifferent),
                Nin = Merge(a.Nin, b.Nin, isAMasterIfValuesAreDifferent),
                Barn = Merge(a.Barn, b.Barn),
                Info = Merge(a.Info, b.Info, isAMasterIfValuesAreDifferent),
                Tags = Merge(a.Tags, b.Tags),
                HprNr = Merge(a.HprNr, b.HprNr, isAMasterIfValuesAreDifferent),
                HprNrStr = Merge(a.HprNrStr, b.HprNrStr, isAMasterIfValuesAreDifferent),
                Fastlegestillinger = Merge(a.Fastlegestillinger, b.Fastlegestillinger),
                Kjonn = Merge(a.Kjonn, b.Kjonn, isAMasterIfValuesAreDifferent),
                HprHelsepersonellKategori = Merge(a.HprHelsepersonellKategori, b.HprHelsepersonellKategori),
                HasFastlege = Merge(a.HasFastlege, b.HasFastlege, isAMasterIfValuesAreDifferent),
                Pasienter = Merge(a.Pasienter, b.Pasienter),
                HprName = Merge(a.HprName, b.HprName, isAMasterIfValuesAreDifferent),
                RegStatus = Merge(a.RegStatus, b.RegStatus, isAMasterIfValuesAreDifferent),
                HprRekvisisjonsrett = Merge(a.HprRekvisisjonsrett, b.HprRekvisisjonsrett),
                HprAutorisasjon = Merge(a.HprAutorisasjon, b.HprAutorisasjon),
                Sivilstand = Merge(a.Sivilstand, b.Sivilstand, isAMasterIfValuesAreDifferent),
                FodselsDato = a.FodselsDato,
                PregName = a.PregName,
                Teams = Merge(a.Teams, b.Teams),
                Harfastlegemedstillinger = Merge(a.Harfastlegemedstillinger, b.Harfastlegemedstillinger),
                Fastlegesessionid = Merge(a.Fastlegesessionid, b.Fastlegesessionid, isAMasterIfValuesAreDifferent),
                HasFastlegeinfo = Merge(a.HasFastlegeinfo, b.HasFastlegeinfo, isAMasterIfValuesAreDifferent),
                IsInFlr = Merge(a.IsInFlr, b.IsInFlr, isAMasterIfValuesAreDifferent),
                IsInHpr = Merge(a.IsInHpr, b.IsInHpr, isAMasterIfValuesAreDifferent),
                IsInPreg = Merge(a.IsInPreg, b.IsInPreg, isAMasterIfValuesAreDifferent),
                BarnUtenForeldrerett = Merge(a.BarnUtenForeldrerett, b.BarnUtenForeldrerett),
                BarnForeldrerett = Merge(a.BarnForeldrerett, b.BarnForeldrerett),
                HarForeldrerett = Merge(a.HarForeldrerett, b.HarForeldrerett, isAMasterIfValuesAreDifferent),
                HasDnummer = Merge(a.HasDnummer, b.HasDnummer, isAMasterIfValuesAreDifferent),
                ValidNin = Merge(a.ValidNin, b.ValidNin, isAMasterIfValuesAreDifferent),
                NinFiveZeros = Merge(a.NinFiveZeros, b.NinFiveZeros, isAMasterIfValuesAreDifferent),
                HprSpesialitet = Merge(a.HprSpesialitet, b.HprSpesialitet),
                DadHasValidNin = Merge(a.DadHasValidNin, b.DadHasValidNin, isAMasterIfValuesAreDifferent),
                EktefelleNin = Merge(a.EktefelleNin, b.EktefelleNin, isAMasterIfValuesAreDifferent),
                MomHasValidNin = Merge(a.MomHasValidNin, b.MomHasValidNin, isAMasterIfValuesAreDifferent)
            };
        }
        

        private static string[] Merge(string[] barn1, string[] barn2)
        {
            if (barn1 == null)
            {
                return barn2;
            }

            if (barn2 == null)
            {
                return barn1;
            }

            var result = new List<string>();
            result.AddRange(barn1);
            result.AddRange(barn2);

            return result.ToArray();
        }

        private static bool? Merge(bool? a, bool? b, bool isAMasterIfValuesAreDifferent)
        {
            if (!a.HasValue)
            {
                return b;
            }

            if (!b.HasValue)
                return a;

            return isAMasterIfValuesAreDifferent ? a : b;
        }

        private static int? Merge(int? a, int? b, bool isAMasterIfValuesAreDifferent)
        {
            if (!a.HasValue)
            {
                return b;
            }

            if (!b.HasValue)
                return a;

            return isAMasterIfValuesAreDifferent ? a : b;
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