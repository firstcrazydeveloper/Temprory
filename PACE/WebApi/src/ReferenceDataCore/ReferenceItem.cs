using System.ComponentModel;
using System.Linq;

namespace ReferenceDataCore
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;

    /// <summary>
    /// Generic Reference Item
    /// </summary>
    public class ReferenceItem
    {
        private IEnumerable<ReferenceItem> _children;

        /// <summary>
        /// Default constructor.
        /// </summary>
        public ReferenceItem()
        {
            // Default IsSelectable to true to allow reference tables without the column 
            // to have their values selected in a tree/list view component.
            IsSelectable = true;

            // Create empty list/dicts.
            Children = new List<ReferenceItem>();
            Flags = new Dictionary<string, bool>();
            OtherColumns = new Dictionary<string, string>();
        }

        /// <summary>
        /// Copy constructor.  
        /// Does not copy context date- only uses the passed in value.
        /// </summary>
        /// <param name="copy"></param>
        /// <param name="contextDate">Overrides the Only return items active on this date.</param>
        public ReferenceItem(ReferenceItem copy, DateTime? contextDate = null)
        {
            // Fields in alphabetical order...
            Abbreviation = copy.Abbreviation;
            Children = new List<ReferenceItem>(copy.Children);
            Code = copy.Code;
            ContextDate = contextDate;
            Description = copy.Description;
            EndDate = copy.EndDate;
            Flags = new Dictionary<string, bool>(copy.Flags);
            Id = copy.Id;
            IsSelectable = copy.IsSelectable;
            OtherColumns = new Dictionary<string, string>(copy.OtherColumns);
            Parent = copy.Parent;
            DisplayOrder = copy.DisplayOrder;
            StartDate = copy.StartDate;
        }


        /// <summary>
        /// Primary Key
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Code, if available.  Not all reference items will have codes.
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Gets or sets the flags.
        /// </summary>
        /// <value>
        /// The flags.
        /// </value>
        public Dictionary<string, bool> Flags { get; protected set; }

        /// <summary>
        /// Gets the other columns that are not covered in the typed properties of ReferenceItem.
        /// </summary>
        /// <value>
        /// The other columns.
        /// </value>
        public Dictionary<string, string> OtherColumns { get; protected set; }

        /// <summary>
        /// Description ammended based on today's date. If ended, (ended) will be added.
        /// </summary>
        public string ContextualDescription
        {
            get
            {
                if (EndDate.HasValue && EndDate.Value < DateTime.Now.Date)
                {
                    return $"{Description} (ended)";
                }

                return Description;
            }
        }

        /// <summary>
        /// Gets or sets the abbreviation.
        /// </summary>
        /// <value>
        /// The abbreviation.
        /// </value>
        public string Abbreviation { get; set; }

        /// <summary>
        /// Gets or sets the context date. This date determines whether the reference item is active on the context date.
        /// </summary>
        /// <value>
        /// The context date.
        /// </value>
        public DateTime? ContextDate { get; set; }

        /// <summary>
        /// Start Date
        /// </summary>
        public DateTime StartDate { get; set; }

        /// <summary>
        /// End Date.  Where end date is earlier than today, the item is considered ended.
        /// </summary>
        public DateTime? EndDate { get; set; }

        /// <summary>
        /// Sort order
        /// </summary>
        public int? DisplayOrder { get; set; }

        /// <summary>
        /// Gets a value indicating whether [is active on context date].
        /// </summary>
        /// <value>
        /// <c>true</c> if [is active on context date]; otherwise, <c>false</c>.
        /// </value>
        public bool IsActiveOnContextDate => IsActiveOnDate(ContextDate.GetValueOrDefault(DateTime.Now.Date));

        /// <summary>
        /// Helper property for determining if an item is active today.
        /// </summary>
        public bool IsActiveToday => StartDate.Date <= DateTime.Now.Date &&
                                     (!EndDate.HasValue || EndDate.Value.Date >= DateTime.Now.Date);

        /// <summary>
        /// Parent code.  Where reference items have codes and are heirachical, this item will contain the
        /// parent code.
        /// </summary>
        public string Parent { get; set; }

        /// <summary>
        /// Children of this reference item.
        /// </summary>
        public IEnumerable<ReferenceItem> Children
        {
            get => _children;
            set
            {
                _children = value;

                // Only set has children to true if we have children in our array here, we don't want to set it to 
                // false if we don't have any in our array as we may be lazy loading them. In that case, has children is the primary
                // tell for us that we have more to load.
                if (_children == null || !_children.Any())
                {
                    return;
                }

                HasChildren = true;
            }
        }

        /// <summary>
        /// Gets or sets a value indicating whether this instance has children.
        /// </summary>
        /// <value>
        /// <c>true</c> if this instance has children; otherwise, <c>false</c>.
        /// </value>
        public bool HasChildren { get; set; }

        /// <summary>
        /// Is this item selectable by the user.
        /// </summary>
        public bool IsSelectable { get; set; }

        /// <summary>
        /// Gets a flag from the reference item's flag dictionary. If the flagName doesn't match any existing key, 
        /// this method returns false, rather then throwing an exception.
        /// </summary>
        /// <param name="flagName">Name of the flag.</param>
        /// <returns></returns>
        public bool SafeGetFlag(string flagName)
        {
            if (!Flags.ContainsKey(flagName))
            {
                // Note we're not using debug.assert here as sometimes properties will exist on reference items that do not exist in the database,
                // and we'll expect a return value of false in this case. For example, if you have a parent class that has type safe properties on flags that may 
                // span mulitple types of reference items.
                Debug.WriteLine(
                    "You're passing in a flagName that doesn't exist in the flags dictionary. Are you sure your flag name is correct?");
            }

            return Flags.ContainsKey(flagName) && Flags[flagName];
        }

        /// <summary>
        /// Returns a column value as a string, if the column name doesn't exist, then string.empty.
        /// </summary>
        /// <param name="columnName">Name of the column.</param>
        /// <returns></returns>
        public string SafeGetOtherColumn(string columnName)
        {
            if (!OtherColumns.ContainsKey(columnName))
            {
                // Note we're not using debug.assert here as sometimes properties will exist on reference items that do not exist in the database,
                // and we'll expect a return value of false in this case. For example, if you have a parent class that has type safe properties on flags that may 
                // span mulitple types of reference items.
                Debug.WriteLine(
                    "You're passing in an other column that doesn't exist in the OtherColumns dictionary. Are you sure your column name is correct?");
            }

            return OtherColumns.ContainsKey(columnName) ? OtherColumns[columnName] : string.Empty;
        }

        /// <summary>
        /// Get an other column value as a specified type.
        /// If the column doesn't exist, throws an exception.
        /// If the type conversion fails, throws an exception.
        /// </summary>
        /// <param name="columnName"></param>
        /// <returns></returns>
        public string GetOtherColumn(string columnName)
        {
            if (!OtherColumns.ContainsKey(columnName))
                throw new ArgumentOutOfRangeException(columnName);

            var stringValue = OtherColumns[columnName];
            return !string.IsNullOrWhiteSpace(stringValue) ? stringValue : null;
        }

        /// <summary>
        /// Get an other column value as a specified type.
        /// If the column doesn't exist, throws an exception.
        /// If the type conversion fails, throws an exception.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="columnName"></param>
        /// <returns></returns>
        public T GetOtherColumn<T>(string columnName) where T : struct
        {
            var nullableValue = GetOtherColumnNullable<T>(columnName);
            return nullableValue ?? default(T);
        }

        /// <summary>
        /// Get an other column value as a specified type.
        /// If the column doesn't exist, throws an exception.
        /// If the type conversion fails, throws an exception.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="columnName"></param>
        /// <returns></returns>
        public T? GetOtherColumnNullable<T>(string columnName) where T : struct
        {
            if (!OtherColumns.ContainsKey(columnName))
            {
                throw new ArgumentOutOfRangeException(columnName);
            }

            var stringValue = OtherColumns[columnName];
            if (string.IsNullOrWhiteSpace(stringValue))
            {
                return null;
            }

            // Get converter for type T and convert
            var converter = TypeDescriptor.GetConverter(typeof(T));
            var value = converter.ConvertFromString(stringValue);
            return (T?) value;
        }

        /// <summary>
        /// Determines whether [is active on date] [the specified date].
        /// </summary>
        /// <param name="date">The date.</param>
        /// <returns></returns>
        public bool IsActiveOnDate(DateTime date)
        {
            var isActive = StartDate.Date <= date.Date && (!EndDate.HasValue || EndDate.Value.Date >= date.Date);
            return isActive;
        }
    }
}