import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, Trash, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { buttonVariants } from "./ui/button";
import { cn } from "@/app/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import type { User } from "@/api/db/schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";

interface DialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AccountDeletionConfirm: React.FC<DialogProps> = (props) => {
  const { isOpen, setIsOpen } = props;
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface Props {
  user: User | null;
}

const UserAvatar: React.FC<Props> = ({ user }) => {
  const [accountDeletionOpen, setAccountDeletionOpen] = React.useState(false);

  if (!user) {
    return (
      <a className={cn(buttonVariants())} href="/api/auth/login/github">
        <GitHubLogoIcon className="mr-2" />
        Login with GitHub
      </a>
    );
  }

  return (
    <>
      <AccountDeletionConfirm
        isOpen={accountDeletionOpen}
        setIsOpen={setAccountDeletionOpen}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src={user.avatarUrl ?? ""} />
            <AvatarFallback>
              <UserIcon />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-60">
          <div className="flex gap-4 p-2">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatarUrl ?? ""} alt={user.name} />
              <AvatarFallback>
                <UserIcon size="3rem" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.username}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Account Settings</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setAccountDeletionOpen(true)}>
            Delete Account
            <DropdownMenuShortcut>
              <Trash size="1rem" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <a href="/api/auth/logout">
            <DropdownMenuItem>
              Logout
              <DropdownMenuShortcut>
                <LogOut size="1rem" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </a>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAvatar;
