# Predicates

Define logical conditions to test an input value.

## Installation

```
npm install @criteria/predicates
```

## Usage

Create a predicate from a string:

```
import { Predicate } from '@criteria/predicates'

const predicate = Predicate.parse('name = $searchTerm')
```

Test an input value:

```
const person = {
    name: "Joe"
}

const output = predicate.evaluate(person, { searchTerm: "Joe" })
// output === true
```

Serialize a predicate to a string:

```
const string = predicate.toString()
```
