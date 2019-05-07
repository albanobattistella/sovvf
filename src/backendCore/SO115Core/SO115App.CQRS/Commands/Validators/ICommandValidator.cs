﻿using CQRS.Validation;
using System.Collections.Generic;

// Credits to Steven van Deursen for this implementation
// https://stackoverflow.com/questions/52593426/registering-open-generic-decorators-through-a-single-binding-rule

namespace CQRS.Commands.Validators
{
    public interface ICommandValidator<TCommand>
    {
        IEnumerable<ValidationResult> Validate(TCommand command);
    }
}