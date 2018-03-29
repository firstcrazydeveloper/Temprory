using System.Data;

namespace ReferenceDataCore
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    /// <summary>
    /// Generic Reference Service. This service is the primary means for retrieving reference data.
    /// </summary>
    public class ReferenceService : IReferenceService
    {
        private readonly string _connection;

        /// <summary>
        /// Starts db dependency caching.
        /// </summary>
        public void StartDependencyCaching()
        {
            var refService = new ReferenceDataService(_connection);
            refService.StartSqlDependencyService();
        }

        public ReferenceService(string connection)
        {
            _connection = connection;
        }

        /// <summary>
        /// Stops db dependency caching.
        /// </summary>
        public void StopDependencyCaching()
        {
            var refService = new ReferenceDataService(_connection);
            refService.StopSqlDependencyService();
        }

        /// <summary>
        /// Searches the specified type including description and code
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="searchText">The search text.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        public IEnumerable<ReferenceItem> Search(ReferenceType type, string searchText, bool isActive = false)
        {
            if (string.IsNullOrWhiteSpace(searchText))
            {
                return new List<ReferenceItem>();
            }

            var searchTextLower = searchText.ToLower();

            if (isActive)
            {
                return GetActive(type)
                    .Where(r => r.Description.ToLower().Contains(searchTextLower) ||
                                r.Code.ToLower().Contains(searchTextLower));
            }

            return GetAll(type)
                .Where(r => r.Description.ToLower().Contains(searchTextLower) ||
                            r.Code.ToLower().Contains(searchTextLower));
        }

        /// <summary>
        /// Gets the empty reference item along with all the flags / other columns
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns></returns>
        public ReferenceItem GetEmptyReferenceItem(ReferenceType type)
        {
            var template = GetAll(type).FirstOrDefault();
            if (template == null)
            {
                return new ReferenceItem();
            }

            var emptyRefItem = new ReferenceItem
            {
                Id = 0,
                Description = string.Empty,
                Code = string.Empty,
                Parent = null,
                DisplayOrder = null,
                // Don't want empty values showing up as active.
                StartDate = new DateTime(1900, 1, 1),
                EndDate = new DateTime(1900, 1, 1),
                ContextDate = DateTime.Now
            };

            foreach (var otherColumnKey in template.OtherColumns.Keys)
            {
                emptyRefItem.OtherColumns.Add(otherColumnKey, string.Empty);
            }

            foreach (var flagKey in template.Flags.Keys)
            {
                emptyRefItem.Flags.Add(flagKey, false);
            }

            return emptyRefItem;
        }

        /// <summary>
        /// Gets the a reference item by its primary key id.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ReferenceItem GetById(ReferenceType type, int? id = 0)
        {
            if (id == 0)
            {
                return null;
            }

            return type == ReferenceType.None ? null : GetAll(type).SingleOrDefault(r => r.Id == id);
        }

        /// <summary>
        /// Gets reference items by primary key ids.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="ids">The identifiers.</param>
        /// <returns></returns>
        public IEnumerable<ReferenceItem> GetById(ReferenceType type, IEnumerable<int> ids)
        {
            if (type == ReferenceType.None || ids == null)
            {
                return new ReferenceItem[] { };
            }

            var idList = ids.ToList();
            return GetAll(type).Where(ri => idList.Contains(ri.Id));
        }

        /// <summary>
        /// Gets a reference item by id, or if we can't find it, 
        /// an empty item that represents the reference item, including all its flags.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        public ReferenceItem GetByIdOrEmpty(ReferenceType type, int? id = 0)
        {
            if (id.HasValue && id.Value > 0)
            {
                return GetById(type, id.Value);
            }

            return GetEmptyReferenceItem(type);
        }

        /// <summary>
        /// Gets a reference item by description.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="description">The description.</param>
        /// <param name="isActive">if set to <c>true</c> only active items will be returned.</param>
        /// <returns></returns>
        public ReferenceItem GetByDescription(ReferenceType type, string description, bool isActive = false)
        {
            if (string.IsNullOrWhiteSpace(description))
            {
                return null;
            }

            if (isActive)
            {
                return type == ReferenceType.None
                    ? null
                    : GetActive(type)
                        .FirstOrDefault(r => r.Description.Equals(description, StringComparison.OrdinalIgnoreCase));
            }

            return type == ReferenceType.None
                ? null
                : GetAll(type)
                    .FirstOrDefault(r => r.Description.Equals(description, StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Gets a reference item by code.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="code">The code.</param>
        /// <param name="isActive">if set to <c>true</c> only active items will be returned.</param>
        /// <returns></returns>
        public ReferenceItem GetByCode(ReferenceType type, string code, bool isActive = true)
        {
            if (string.IsNullOrWhiteSpace(code))
            {
                return null;
            }

            if (isActive)
            {
                return type == ReferenceType.None
                    ? null
                    : GetActive(type)
                        .FirstOrDefault(r => r.Code.Equals(code, StringComparison.OrdinalIgnoreCase));
            }

            return type != ReferenceType.None
                ? null
                : GetAll(type).FirstOrDefault(r => r.Code.Equals(code, StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Gets the first reference item by that matches the flag.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="flagName">The flagName.</param>
        /// <param name="flagValue">The flagValue.</param>
        /// <param name="isActive">if set to <c>true</c> only active items will be returned.</param>
        /// <param name="contextDate">The date the reference item needs to be active.</param>
        /// <returns></returns>
        public ReferenceItem GetByFlag(ReferenceType type, string flagName, bool flagValue = true,
            bool isActive = false, DateTime? contextDate = null)
        {
            if (string.IsNullOrWhiteSpace(flagName) || type == ReferenceType.None)
            {
                return null;
            }

            var items = isActive ? GetActive(type) : GetAll(type);
            var item = items.Where(r => r.Flags[flagName] == flagValue)
                .OrderByDescending(r => r.StartDate)
                .FirstOrDefault();

            return item;
        }

        /// <summary>
        /// Gets active reference items at the provided date, otherwise active right now.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="contextDate">Only return items active on this date.</param>
        /// <param name="includeReferenceItemById">If specified, we'll inlucde the reference item represented by this id despite if it is active or not.</param>
        /// <returns></returns>
        public IEnumerable<ReferenceItem> GetActive(ReferenceType type, DateTime? contextDate = null,
            int? includeReferenceItemById = null)
        {
            if (type == ReferenceType.None)
            {
                return new List<ReferenceItem>();
            }

            var active = GetAll(type, contextDate)
                .Where(i => i.IsActiveOnContextDate ||
                            includeReferenceItemById.HasValue && i.Id == includeReferenceItemById.Value);
            return active;
        }

        /// <summary>
        /// Gets the active.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="contextDate">The context date.</param>
        /// <param name="includeReferenceItemByIds">The include reference items that match any ids.</param>
        /// <returns></returns>
        public IEnumerable<ReferenceItem> GetActive(ReferenceType type, DateTime? contextDate,
            IEnumerable<int> includeReferenceItemByIds)
        {
            if (type == ReferenceType.None)
            {
                return new List<ReferenceItem>();
            }

            return GetAll(type, contextDate)
                .Where(i => i.IsActiveOnContextDate || includeReferenceItemByIds.Contains(i.Id));
        }

        /// <summary>
        /// Gets *all* reference items for the type.
        /// The optional context date will not restrict the result set, only prepare the items IsActive* methods.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="contextDate">All items are returned, but their ContextDate will be set to this date.</param>
        /// <returns></returns>
        public IEnumerable<ReferenceItem> GetAll(ReferenceType type, DateTime? contextDate = null)
        {
            if (type == ReferenceType.None)
            {
                return new List<ReferenceItem>();
            }

            var rds = new ReferenceDataService(_connection);
            var ri = rds.GetReferenceItems(type, contextDate)
                .OrderBy(o => o.DisplayOrder)
                .ThenBy(o => o.Description);

            return ri;
        }
    }
}