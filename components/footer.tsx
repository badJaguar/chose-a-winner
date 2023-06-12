import Link from "next/link";
import packageJSON from "../package.json";

export default function Footer() {
  return (
    <footer>
      <hr />
      <ul>
        <li>
          <a href="https://next-auth.js.org">Documentation</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/next-auth">NPM</a>
        </li>
        <li>
          <a href="https://github.com/nextauthjs/next-auth-example">GitHub</a>
        </li>
        <li>
          <Link href="/policy">Policy</Link>
        </li>
        <li>
          <em>next-auth@{packageJSON.dependencies["next-auth"]}</em>
        </li>
      </ul>
    </footer>
  );
}
