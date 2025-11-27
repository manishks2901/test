import { useQuery, useMutation } from "@tanstack/react-query";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import {
  Eye,
  Trash2,
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Check,
} from "lucide-react";
import type { ContactSubmission } from "@shared/schema";

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<ContactSubmission | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: messages, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("PATCH", `/api/contact/${id}`, { isRead: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/contact/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
      toast({
        title: "Message deleted",
        description: "The message has been successfully deleted.",
      });
      setDeleteId(null);
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const openMessage = (message: ContactSubmission) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markReadMutation.mutate(message.id);
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const unreadCount = messages?.filter((m) => !m.isRead).length || 0;

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
            Contact Messages
          </h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread message${unreadCount > 1 ? "s" : ""}`
              : "All messages have been read"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-xl">All Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : messages && messages.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Practice Area</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow
                        key={message.id}
                        className={!message.isRead ? "bg-gold/5" : ""}
                        data-testid={`row-message-${message.id}`}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {!message.isRead && (
                              <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                            )}
                            <div>
                              <p className="font-medium">{message.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {message.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {message.subject}
                        </TableCell>
                        <TableCell>
                          {message.practiceArea ? (
                            <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20">
                              {message.practiceArea}
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(message.createdAt)}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openMessage(message)}
                              data-testid={`button-view-message-${message.id}`}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive"
                              onClick={() => setDeleteId(message.id)}
                              data-testid={`button-delete-message-${message.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  No messages yet
                </h3>
                <p className="text-muted-foreground">
                  Contact form submissions will appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Dialog
          open={selectedMessage !== null}
          onOpenChange={() => setSelectedMessage(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-xl">
                Message from {selectedMessage?.name}
              </DialogTitle>
            </DialogHeader>
            {selectedMessage && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="text-gold hover:underline"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                  </div>
                  {selectedMessage.phone && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a
                          href={`tel:${selectedMessage.phone}`}
                          className="text-gold hover:underline"
                        >
                          {selectedMessage.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Received</p>
                      <p>{formatDate(selectedMessage.createdAt)}</p>
                    </div>
                  </div>
                  {selectedMessage.practiceArea && (
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <Check className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Practice Area</p>
                        <p>{selectedMessage.practiceArea}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Subject</h3>
                  <p className="text-muted-foreground">{selectedMessage.subject}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Message</h3>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-foreground whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() =>
                      window.open(`mailto:${selectedMessage.email}`, "_blank")
                    }
                    data-testid="button-reply-email"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Reply via Email
                  </Button>
                  {selectedMessage.phone && (
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() =>
                        window.open(`tel:${selectedMessage.phone}`, "_blank")
                      }
                      data-testid="button-call"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Message</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this message? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && deleteMutation.mutate(deleteId)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}
