import * as ImportedTypeGuards from "./type-guards"
import * as ImportedNumber from "./number";
import * as ImportedTimespan from "./timespan";
import * as ImportedMath from "./math";
import * as ImportedRandom from "./random";
import * as ImportedArray from "./array";
import * as ImportedHash from "./hash";
import * as ImportedByte from "./byte";
import * as ImportedTimer from "./timer";
import * as ImportedEnvironment from "./environment";
export namespace Tools
{
    export import TypeGuards = ImportedTypeGuards.TypeGuards;
    export import Number = ImportedNumber.Number;
    export import Timespan = ImportedTimespan.Timespan;
    export import Math = ImportedMath.Math;
    export import Random = ImportedRandom.Random;
    export import Array = ImportedArray.Array;
    export import Hash = ImportedHash.Hash;
    export import Byte = ImportedByte.Byte;
    export import Timer = ImportedTimer.Timer;
    export import Environment = ImportedEnvironment.Environment;
}
