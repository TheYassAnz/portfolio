export default function FooterSection() {
  return (
    <footer className="mx-auto my-4 flex w-full items-center justify-between rounded-full bg-[#231F20] px-4 py-4 text-white">
      <span className="text-sm">
        © {new Date().getFullYear()} Yassine. All rights reserved.
      </span>
      <span className="text-sm">
        Made with &#10084; in{" "}
        <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Paris
        </span>
      </span>
    </footer>
  );
}
