//JSX - JavaScript + XML (HTML)
//TSX - TypeScript + JSX

import { Tweet } from "../components/Tweet";

export default function Home() {
  return (
    <div>
      <Tweet text="Meu primeiro tweet"/>
      <Tweet text="Meu segundo tweet"/>
      <Tweet text="Meu terceiro tweet"/>
      <Tweet text="Meu quarto tweet"/>
    </div>
  )
}
