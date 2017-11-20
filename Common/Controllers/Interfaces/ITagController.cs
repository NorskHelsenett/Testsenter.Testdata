using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TestdataApp.Common.Models.DbEntities;

namespace TestdataApp.Common.Controllers.Interfaces
{
    public interface ITagController : IDisposable
    {
        Task<IEnumerable<Tag>> GetAllTags();
        Task<Tag> AddTag(string commonIdentifier, string tag, string index);
        Task<bool> RemoveTagFromPerson(string commonIdentifier, string tag, string index);
        Task<bool> DeleteTag(string tag);
    }
}