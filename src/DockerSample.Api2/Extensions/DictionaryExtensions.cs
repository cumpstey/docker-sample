namespace System.Collections.Generic
{
    public static class DictionaryExtensions
    {
        public static void AddItem<TKey, TVal>(this IDictionary<TKey, IList<TVal>> dictionary, TKey key, TVal value)
        {
            if (dictionary == null) throw new ArgumentNullException(nameof(dictionary));

            if (dictionary.ContainsKey(key))
            {
                if (dictionary[key] == null)
                {
                    dictionary[key] = new List<TVal>();
                }

                dictionary[key].Add(value);
            }
            else
            {
                dictionary.Add(key, new List<TVal> { value });
            }
        }
    }
}
