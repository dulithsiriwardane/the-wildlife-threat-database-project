import Logo from "../../../assets/logos/TWTDBP-White.svg";

export function LoginImagePanel({imageSrc}) {
  return (
    <div className="relative isolate hidden min-h-136 overflow-hidden rounded-[1.25rem] bg-zinc-950 md:block">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#ffdec0_0%,#ea580c_22%,#3d170e_48%,#09090b_75%)]"
      />
      {imageSrc && (
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-twtdbp-ebony via-zinc-800/75 via-55% to-transparent"
      />
      <p className="relative max-w-lg px-8 pt-10 text-3xl font-medium leading-tight tracking-tight text-white lg:px-10 lg:text-4xl">
        <img src={Logo} alt="TWTDBP-Logo" className="w-56" />
      </p>
    </div>
  );
}
