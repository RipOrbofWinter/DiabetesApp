using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Common.ExtensionMethods
{
    public static class StringExtension

    {

        public static string TrimEndWord(this string source, string trimWord)

        {

            int breakPoint = source.Length - trimWord.Length;

            if (breakPoint < 0)

                return source;

            var baseString = source.Substring(0, breakPoint);

            var endString = source.Substring(breakPoint).Replace(trimWord, "");

            return baseString + endString;

        }


        public static string FindFromBeginAndEnd(this string source, string openingText, string closingText)

        {

            var startPos = source.IndexOf(openingText);

            if (startPos != -1)

            {

                var endPos = source.IndexOf(closingText, startPos + openingText.Length);

                if (endPos != -1)

                    return source.Substring(startPos, endPos - startPos + 1);

            }

            return "";

        }


        public static string ReplaceLastOccurrence(this string source, string find, string replace)

        {

            int place = source.LastIndexOf(find);



            if (place == -1)

                return source;



            string result = source.Remove(place, find.Length).Insert(place, replace);

            return result;

        }


        public static string AddTrailingSpaces(this string source, int number)

        {

            var value = String.Format("{0," + -(number + source.Length) + "}", source);

            return value;

        }


        public static string AddLeadingSpaces(this string source, int number)

        {

            var value = String.Format("{0," + (number + source.Length) + "}", source);

            return value;

        }


        public static string FillTrailingSpaces(this string source, int number)

        {

            if (source.Length > number)

                source = source.Substring(0, number);



            var value = String.Format("{0," + -(number) + "}", source);

            return value;

        }


        public static string FillLeadingSpaces(this string source, int number)

        {

            if (source.Length > number)

                source = source.Substring(0, number);



            var value = String.Format("{0," + (number) + "}", source);

            return value;

        }


        public static string CRLF(this string source)

        {

            return source + "\r\n";

        }


        public static string[] SplitLineBreak(this string source)

        {

            string[] lines = source.Split(

                new[] { "\r\n", "\r", "\n" },

                 StringSplitOptions.None

                );



            return lines;

        }


        public static string ToCamelCase(this string str)

        {

            if (!string.IsNullOrEmpty(str) && str.Length > 1)

            {

                string[] split = str.Split(new Char[] { ' ', '-', '_' },

                                 StringSplitOptions.RemoveEmptyEntries);

                var firstUpper = split.Select(item => Char.ToUpperInvariant(item[0]) + item.Substring(1));

                var joinedSplit = String.Join("", firstUpper);

                Regex rgx = new Regex("[^a-zA-Z0-9]");

                string numOnly = rgx.Replace(joinedSplit, "");

                return Char.ToLowerInvariant(joinedSplit[0]) + joinedSplit.Substring(1);

            }

            return str;

        }

        public static string ReplaceLastChars(string Input, string ReplacementChars)
        {
            int length = Input.Length;
            if (length < ReplacementChars.Length) return $"Error: The provided Input string is not greater than {ReplacementChars.Length} characters long.";
            return Input.Substring(0, length - ReplacementChars.Length) + ReplacementChars;
        }

    }
}

