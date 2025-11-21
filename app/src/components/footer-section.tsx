export default function FooterSection() {
  return (
    <footer className="flex justify-between items-center md:px-8 px-4 mx-auto bg-[#231F20] text-white w-full py-4">
      <span className="text-sm">
        © {new Date().getFullYear()} Yassine. All rights reserved.
      </span>
      <span className="text-sm">
        Made with &#10084; in{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
          Paris
        </span>
      </span>
    </footer>
  );
}
