export default function FooterSection() {
  return (
    <footer className="mx-auto my-4 flex w-full items-center justify-between rounded-full bg-[#231F20] px-4 py-4 text-white">
      <span className="text-sm">
        © {new Date().getFullYear()} Yassine ANZAR BASHA. All rights reserved.
      </span>
    </footer>
  );
}
