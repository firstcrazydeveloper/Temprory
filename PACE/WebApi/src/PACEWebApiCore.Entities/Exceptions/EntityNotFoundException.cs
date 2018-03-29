using System;

namespace PACEWebApiCore.Entities.Exceptions
{
    /// <inheritdoc />
    /// <summary>
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class EntityNotFoundException<T> : Exception where T : class
    {
        /// <summary>The Id that uniquely identifies the entity</summary>
        private int Id { get; set; }

        /// <inheritdoc />
        /// <summary>
        /// Creates a new EntityNotFoundException for a specified entity, message is optional.
        /// </summary>
        /// <param name="id"></param>
        public EntityNotFoundException(int id)
            : base($"Unable to find entity of type '{typeof(T).Name}' with unique Id {id}.")
        {
            Id = id;
        }
    }
}