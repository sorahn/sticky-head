# sticky-head

> TODO: Component Description

## Usage

Simply replace the `<thead>` in any table with `<StickyHead>`

```js
// Import Component
import { StickyHead } from "sticky-head"

const App = () => {
  return (
    <table>
      <StickyHead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
      </StickyHead>
      <tbody>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
        </tr>
      </tbody>
    </table>
  )
}
```

## See it in action
This repo contains some demos that you can run to see it in action. To get started using the demos run the following commands.
```sh
$ git clone https://github.com/sorahn/sticky-head.git
$ cd sticky-head
$ yarn start
```