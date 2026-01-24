import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const DISCLAIMER_STORAGE_KEY = "wadhwa-disclaimer-agreed";

export function DisclaimerDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has already agreed to disclaimer
    const hasAgreed = localStorage.getItem(DISCLAIMER_STORAGE_KEY);
    if (!hasAgreed) {
      setOpen(true);
    }
  }, []);

  const handleAgree = () => {
    localStorage.setItem(DISCLAIMER_STORAGE_KEY, "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogClose
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          asChild
        >
          <button className="inline-flex items-center justify-center">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>Disclaimer</DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3 text-left text-muted-foreground">
              <p>
                The current rules of the Bar Council of India restrict/prohibit law firms from advertising and soliciting work through communication in the public domain. This website has been designed solely for disseminating basic information about Wadhwa & Co, which is made available at the specific request of the visitor/user. By clicking on &apos;AGREE&apos;, the visitor acknowledges that:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>the contents of this website do not amount to advertising or solicitation;</li>
                <li>the information provided on the website is meant only for his/her understanding of our activities and who we are of their own volition;</li>
                <li>the contents of this website do not constitute, and shall not be construed as, legal advice or substitute for legal advice;</li>
                <li>the use of this website is completely at the user's own volition and shall not create or amount to an attorney-client relationship;</li>
                <li>Wadhwa & Co. is not liable for the consequence of any action or decision taken by the visitor by relying on the contents of this website or of any external links on this website;</li>
                <li>Wadhwa & Co. does not assume any liability for the interpretation or use of the information provided on this website and does not offer any warranty, either express or implied;</li>
                <li>the contents of this website are the property of Wadhwa & Co. and the visitor is not authorised to use any part thereof, with or without adaptation, without the express prior written consent of Wadhwa & Co.;</li>
                <li>Wadhwa & Co uses cookies on this website to improve user experience. By continuing to use this website without changing your privacy settings, you agree to the use of cookies.</li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button onClick={handleAgree}>AGREE</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
