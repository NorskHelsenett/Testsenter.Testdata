using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Shared.Common.DI;
using TestdataApp.Common.Models.Common;
using TestdataApp.Common.Models.DTO;
using TestdataApp.Common.Search;
using TestdataApp.Common.Security;

namespace TestdataApp.ExampleProject.Models
{
    public class DetailsProvider : IDetailsProvider
    {
        private readonly IDependencyInjector _di;

        public DetailsProvider(IDependencyInjector di)
        {
            _di = di;
        }

        public async Task<IDetails> GetPersonDetails(IIndexEntity item, string environment, Team teamForLoggedInUser)
        {
            var p= new PersonDetails()
            {
                HprJson = GetJson("hprData"),
                PregJson = GetJson("pregData"),
                FastlegeJson = null,
                FastlegePasientJson = null
            };

            p.Surveillances = new List<Surveillance>();
            //await p.SetSurveillanceInfo(_di, item, teamForLoggedInUser);
            return p;
        }

        private static Dictionary<string,string> _data = new Dictionary<string, string>();
        private string GetJson(string filename)
        {
            if (_data.ContainsKey(filename))
                return _data[filename];

            var dataBytes = (byte[])Properties.Resources.ResourceManager.GetObject(filename);
            if (dataBytes == null)
                throw new ArgumentException("kunne ikke lese fil");

            bool hasMoreLines = true;
            var file = new MemoryStream(dataBytes);
            var reader = new StreamReader(file);

            while (!reader.EndOfStream)
            {
                var nextLine = reader.ReadLine();
                _data.Add(filename, nextLine);
                return _data[filename];
            }

            return null;
        }

        public async Task<IDetails> GetBusinessDetails(IIndexEntity item, string environment, Team teamForLoggedInUser)
        {
            return null;
        }
    }
}