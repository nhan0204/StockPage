using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace api.Extensions
{
    public static class ClaimExtension
    {
        public static string GetUserName(this ClaimsPrincipal user)
        {
            return user.Claims
                .SingleOrDefault(claim => claim.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"))!.Value;
        }
    }
}