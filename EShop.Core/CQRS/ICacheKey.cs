﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Core.CQRS
{
    public interface ICacheKey<TQuery>
    {
        Func<TQuery, string> KeyFn { get; set; }
    }
}
