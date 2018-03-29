using System;
using System.Collections.Generic;

namespace ReferenceDataCore
{
    public interface IReferenceService
    {
        /// <summary>
        /// Starts db dependency caching.
        /// </summary>
        void StartDependencyCaching();

        /// <summary>
        /// Stops db dependency caching.
        /// </summary>
        void StopDependencyCaching();

        /// <summary>
        /// Searches the specified type including description and code
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="searchText">The search text.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns></returns>
        IEnumerable<ReferenceItem> Search(ReferenceType type, string searchText, bool isActive = true);

        /// <summary>
        /// Gets the empty reference item along with all the flags / other columns
        /// </summary>
        /// <param name="type">The type.</param>
        /// <returns></returns>
        ReferenceItem GetEmptyReferenceItem(ReferenceType type);

        /// <summary>
        /// Gets *all* reference items for the type.
        /// The optional context date will not restrict the result set, only prepare the items IsActive* methods.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="contextDate">All items are returned, but their ContextDate will be set to this date.</param>
        /// <returns></returns>
        IEnumerable<ReferenceItem> GetAll(ReferenceType type, DateTime? contextDate = null);

        /// <summary>
        /// Gets the a reference item by its primary key id.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        ReferenceItem GetById(ReferenceType type, int? id = 0);

        /// <summary>
        /// Gets reference items by primary key ids.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="ids">The identifiers.</param>
        /// <returns></returns>
        IEnumerable<ReferenceItem> GetById(ReferenceType type, IEnumerable<int> ids);

        /// <summary>
        /// Gets a reference item by id, or if we can't find it, 
        /// an empty item that represents the reference item, including all its flags.
        /// We bind an empty reference item rather than setting to null 
        /// to allow Knockout to create a valid viewmodel structure for it.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        ReferenceItem GetByIdOrEmpty(ReferenceType type, int? id = 0);

        /// <summary>
        /// Gets a reference item by description.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="description">The description.</param>
        /// <param name="isActive">if set to <c>true</c> only active items will be returned.</param>
        /// <returns></returns>
        ReferenceItem GetByDescription(ReferenceType type, string description, bool isActive = false);

        /// <summary>
        /// Gets a reference item by code.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="code">The code.</param>
        /// <param name="isActive">if set to <c>true</c> only active items will be returned.</param>
        /// <returns></returns>
        ReferenceItem GetByCode(ReferenceType type, string code, bool isActive = false);

        /// <summary>
        /// Gets the first reference item by that matches the flag.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="flagName">The flagName.</param>
        /// <param name="flagValue">The flagValue.</param>
        /// <param name="isActive">if set to <c>true</c> only active items will be returned.</param>
        /// <param name="contextDate">The date the reference item needs to be active.</param>
        /// <returns></returns>
        ReferenceItem GetByFlag(ReferenceType type, string flagName, bool flagValue = true, bool isActive = false,
            DateTime? contextDate = null);

        /// <summary>
        /// Gets active reference items at the provided date, otherwise active right now.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="contextDate">Only return items active on this date.</param>
        /// <param name="includeReferenceItemById">If specified, we'll inlucde the reference item represented by this id despite if it is active or not.</param>
        /// <returns></returns>
        IEnumerable<ReferenceItem> GetActive(ReferenceType type, DateTime? contextDate = null,
            int? includeReferenceItemById = null);

        /// <summary>
        /// Gets the active.
        /// </summary>
        /// <param name="type">The type.</param>
        /// <param name="contextDate">The context date.</param>
        /// <param name="includeReferenceItemByIds">The include reference items that match any ids.</param>
        /// <returns></returns>
        IEnumerable<ReferenceItem> GetActive(ReferenceType type, DateTime? contextDate,
            IEnumerable<int> includeReferenceItemByIds);
    }
}