import {useState} from "react";
import wildlife from "../assets/images/elephant-family-winding-river.png";
import logo from "../assets/logos/TWTDBP-Black.svg";
import {Button} from "../components/common/Button";
import {SignupProgress} from "../components/auth/signup/SignupProgress";
import {AccountTypeStep} from "../components/auth/signup/AccountTypeStep";
import {SignupDetailsStep} from "../components/auth/signup/SignupDetailsStep";
import {ProfilePhotoStep} from "../components/auth/signup/ProfilePhotoStep";
import {LoginImagePanel} from "../components/auth/login/LoginImagePanel";
import {ArrowLeft} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";

export function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState("");
  const [draft, setDraft] = useState({countryCode: "LK"});
  const [documentFile, setDocumentFile] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const officer = account === "officer";
  const titles = [
    "Create an account",
    officer ? "Enter your officer details" : "Enter your details",
    "Add a profile photo",
  ];
  const descriptions = [
    "Choose the account type that applies to you.",
    officer
      ? "Add your personal and work information, then upload a document that verifies your government role."
      : "Add your personal information and choose your login details.",
    "Choose the image you’d like to display on your profile.",
  ];

  function handleAccount(event) {
    setAccount(event.target.value);
    if (event.target.value === "officer") {
      setDraft(function setOfficerDesignation(previous) {
        return {
          ...previous,
          designation: previous.designation || "Wildlife officer",
        };
      });
    }
    setError("");
  }
  function handleField(event) {
    const {name, value} = event.target;
    setDraft(function update(previous) {
      return {...previous, [name]: value};
    });
  }
  function handleDocument(file) {
    setDocumentFile(file);
    setError("");
  }
  function handlePhoto(file) {
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file.");
      return;
    }
    setPhoto(file);
    setError("");
  }
  function goBack() {
    setError("");
    setStep(step - 1);
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (step === 1 && !account)
      return setError("Choose an account type to continue.");
    if (step === 2 && officer && !documentFile)
      return setError("Choose a verification document to continue.");
    if (step === 3 && !photo)
      return setError("Choose a profile photo to continue.");
    setError("");
    if (step < 3) setStep(step + 1);
    else navigate("/dashboard");
  }
  return (
    <main className="grid min-h-dvh place-items-center overflow-x-hidden bg-zinc-100 p-4 font-display sm:p-8">
      <section
        aria-labelledby="signup-title"
        className={
          "mx-auto grid w-full min-w-0 rounded-[1.75rem] bg-white text-twtdbp-ebony shadow-xl " +
          (step === 1 ? "max-w-5xl md:grid-cols-2 md:p-5" : "max-w-6xl lg:p-5")
        }
      >
        {step === 1 && <LoginImagePanel imageSrc={wildlife} />}
        <div className="my-auto min-w-0 px-6 py-8 sm:px-10 lg:px-12">
          <img src={logo} alt="TWTDBP" className="mb-6 w-52 lg:hidden" />
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              aria-label="Go back"
              className="mb-4 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-zinc-700 hover:bg-zinc-200 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-twtdbp-crimson"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              Back
            </button>
          )}
          <SignupProgress step={step} />
          <h1
            id="signup-title"
            className="text-4xl font-semibold tracking-tight"
          >
            {titles[step - 1]}
          </h1>
          <p className="mt-2 text-sm text-zinc-600">{descriptions[step - 1]}</p>
          <form
            method="post"
            onSubmit={handleSubmit}
            className={"mt-5 space-y-5 pt-3 " + (step >= 2 ? "@container" : "")}
          >
            {step === 1 && (
              <AccountTypeStep account={account} onChange={handleAccount} />
            )}
            {step === 2 && (
              <SignupDetailsStep
                officer={officer}
                draft={draft}
                onChange={handleField}
                documentFile={documentFile}
                onDocument={handleDocument}
              />
            )}
            {step === 3 && (
              <ProfilePhotoStep
                photo={photo}
                onPhoto={handlePhoto}
                fullName={draft.fullName ?? ""}
                email={draft.email ?? ""}
                accountType={account}
              />
            )}
            {error && (
              <p role="alert" className="text-sm text-twtdbp-crimsondark">
                {error}
              </p>
            )}
            <div
              className={`flex items-center gap-3 ${step === 1 ? "" : "justify-end"}`}
            >
              {step > 1 && (
              <Button
                type="button"
                  onClick={goBack}
                  size={48}
                  className="gap-2 border border-zinc-300 bg-white text-zinc-800 hover:!bg-zinc-100 hover:!text-zinc-900"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  Back
                </Button>
              )}
              <Button
                type="submit"
                size={48}
                className={`text-white! ${step === 1 ? "w-full" : ""}`}
              >
                {step === 3 ? "Create account" : "Continue"}
              </Button>
            </div>
          </form>
          {step === 1 && (
            <p className="mt-4 text-center text-sm text-zinc-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-twtdbp-ebony underline underline-offset-4 hover:font-bold"
              >
                Log in
              </Link>
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
