using PACEWebApiCore.Utilities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GenericRepository.Interfaces
{
    public interface IDataRepository<T> where T : new()
    {
        T Get(int id);
        IEnumerable<T> Get(object filters);
        IEnumerable<T> GetList();
        T Insert(T instance);

        IEnumerable<T> GetSearch(string propertyName, string searchTerm);
        List<T> InsertList(List<T> instance);
        bool Delete(object filter);
        T Update(T instance);
        IEnumerable<T> GetWhere(object filters);

        IEnumerable<T> GetPage(object filter, IEnumerable<SortDescriptor> sortings, int pageIndex, int pageSize);

        //Async methods
        Task<T> GetAsync(int id);
        Task<IEnumerable<T>> GetWhereAsync(object filters);
        Task<IEnumerable<T>> GetListAsync();
        Task<IEnumerable<T>> GetAsync(object filters);
        Task<bool> UpdateAsync(T instance);
        Task<T> InsertAsync(T instance);
        Task<bool> DeleteAsync(object filter);

        Task<IEnumerable<T>> GetPageAsync(object filter, IEnumerable<SortDescriptor> sortings, int pageIndex,
            int pageSize);
    }
}