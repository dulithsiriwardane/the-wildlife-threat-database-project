import {LoginCard} from "../components/auth/login/LoginCard";
import elephantFamilyRiverImg from "../assets/images/elephant-family-winding-river.png";

export function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-zinc-100 p-4 font-display sm:p-8">
      <LoginCard
        imageSrc={elephantFamilyRiverImg}
        signUpHref="/signup"
      />
    </main>
  );

}
