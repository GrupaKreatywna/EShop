using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace EShop.Controllers.User
{
    public class HashedPassword
    {

        public string Salt { get; private set; }
        public string Hash { get; private set; }

        private HashedPassword()
        {
        }

        public HashedPassword(byte[] salt, byte[] hash)
        {
            Salt = Convert.ToBase64String(salt);
            Hash = Convert.ToBase64String(hash);
        }

        public HashedPassword(string salt, string hash)
        {
            Salt = salt;
            Hash = hash;
        }

        public HashedPassword(string saltedPassword)
        {
            Salt = saltedPassword.Substring(0, 24);
            Hash = saltedPassword.Substring(24);
        }
        public byte[] SaltToArray()
        {
            return Convert.FromBase64String(Salt);
        }
        public byte[] HashToArray()
        {
            return Convert.FromBase64String(Hash);
        }

        public string ToSaltedPassword()
        {
            return Salt + Hash;
        }
    }

    public static class PasswordHelper
    {
        public const int SALT_BYTE_SIZE = 16;
        public const int HASH_BYTE_SIZE = 16;
        public const int PBKDF2_ITERATIONS = 40000;

        public static string CreateHash(string password)
        {
            byte[] salt;
            using (RNGCryptoServiceProvider csprng = new RNGCryptoServiceProvider())
            {
                salt = new byte[SALT_BYTE_SIZE];
                csprng.GetBytes(salt);
            }

            byte[] hash = PBKDF2(password, salt, PBKDF2_ITERATIONS, HASH_BYTE_SIZE);
            return new HashedPassword(salt, hash).ToSaltedPassword();
        }

        public static bool ValidatePassword(string password, string saltedPassword)
        {
            var correctPassword = new HashedPassword(saltedPassword);
            var testHash = PBKDF2(password, correctPassword.SaltToArray(), PBKDF2_ITERATIONS, HASH_BYTE_SIZE);
            return ConstantTimeEquals(correctPassword.HashToArray(), testHash);
        }

        private static byte[] PBKDF2(string password, byte[] salt, int iterations, int outputBytes)
        {
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, PBKDF2_ITERATIONS))
            {
                return pbkdf2.GetBytes(outputBytes);
            }
        }

        private static bool ConstantTimeEquals(byte[] a, byte[] b)
        {
            var diff = (uint)a.Length ^ (uint)b.Length;
            for (int i = 0; i < a.Length && i < b.Length; i++)
            {
                diff |= (uint)(a[i] ^ b[i]);
            }
            return diff == 0;
        }
    }
}
