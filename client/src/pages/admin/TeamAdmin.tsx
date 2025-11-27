import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import type { TeamMember } from "@shared/schema";

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedIn: z.string().optional(),
  displayOrder: z.number().default(0),
  isPartner: z.boolean().default(false),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

export default function TeamAdmin() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: team, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/team"],
  });

  const form = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: "",
      title: "",
      bio: "",
      email: "",
      phone: "",
      imageUrl: "",
      linkedIn: "",
      displayOrder: 0,
      isPartner: false,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: TeamMemberFormData) => {
      return apiRequest("POST", "/api/team", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team"] });
      toast({
        title: "Team member added",
        description: "The team member has been successfully added.",
      });
      setIsDialogOpen(false);
      form.reset();
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
        description: "Failed to add team member. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: TeamMemberFormData) => {
      return apiRequest("PATCH", `/api/team/${editingMember?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team"] });
      toast({
        title: "Team member updated",
        description: "The team member has been successfully updated.",
      });
      setIsDialogOpen(false);
      setEditingMember(null);
      form.reset();
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
        description: "Failed to update team member. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/team/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team"] });
      toast({
        title: "Team member deleted",
        description: "The team member has been successfully deleted.",
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
        description: "Failed to delete team member. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: TeamMemberFormData) => {
    if (editingMember) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    form.reset({
      name: member.name,
      title: member.title,
      bio: member.bio || "",
      email: member.email || "",
      phone: member.phone || "",
      imageUrl: member.imageUrl || "",
      linkedIn: member.linkedIn || "",
      displayOrder: member.displayOrder || 0,
      isPartner: member.isPartner || false,
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingMember(null);
    form.reset({
      name: "",
      title: "",
      bio: "",
      email: "",
      phone: "",
      imageUrl: "",
      linkedIn: "",
      displayOrder: 0,
      isPartner: false,
    });
    setIsDialogOpen(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const partners = team?.filter((m) => m.isPartner) || [];
  const associates = team?.filter((m) => !m.isPartner) || [];

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
              Team Members
            </h1>
            <p className="text-muted-foreground">
              Manage your firm's attorneys and staff
            </p>
          </div>
          <Button onClick={openCreateDialog} data-testid="button-new-team-member">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : team && team.length > 0 ? (
          <div className="space-y-8">
            {partners.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Partners
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {partners.map((member) => (
                    <Card key={member.id} className="overflow-visible" data-testid={`card-team-${member.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-16 h-16 border-2 border-gold/20">
                            <AvatarImage
                              src={member.imageUrl || undefined}
                              alt={member.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-foreground">
                                  {member.name}
                                </h3>
                                <p className="text-sm text-gold">{member.title}</p>
                              </div>
                              <Badge variant="secondary" className="bg-gold/10 text-gold border-gold/20 shrink-0">
                                Partner
                              </Badge>
                            </div>
                            {member.email && (
                              <p className="text-xs text-muted-foreground mt-2 truncate">
                                {member.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => openEditDialog(member)}
                            data-testid={`button-edit-team-${member.id}`}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => setDeleteId(member.id)}
                            data-testid={`button-delete-team-${member.id}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {associates.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Associates & Staff
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {associates.map((member) => (
                    <Card key={member.id} className="overflow-visible" data-testid={`card-team-${member.id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="w-14 h-14 border-2 border-border">
                            <AvatarImage
                              src={member.imageUrl || undefined}
                              alt={member.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-muted text-muted-foreground">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground">
                              {member.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {member.title}
                            </p>
                            {member.email && (
                              <p className="text-xs text-muted-foreground mt-1 truncate">
                                {member.email}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => openEditDialog(member)}
                          >
                            <Pencil className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => setDeleteId(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                No team members yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Add your first team member to get started
              </p>
              <Button onClick={openCreateDialog} data-testid="button-add-first-member">
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </CardContent>
          </Card>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-serif">
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Full name"
                          {...field}
                          data-testid="input-team-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Senior Partner"
                          {...field}
                          data-testid="input-team-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          {...field}
                          data-testid="input-team-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+91 98765 43210"
                          {...field}
                          data-testid="input-team-phone"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief biography..."
                          className="min-h-[100px] resize-none"
                          {...field}
                          data-testid="input-team-bio"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/photo.jpg"
                          {...field}
                          data-testid="input-team-image"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/..."
                          {...field}
                          data-testid="input-team-linkedin"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Order</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          data-testid="input-team-order"
                        />
                      </FormControl>
                      <FormDescription>
                        Lower numbers appear first
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isPartner"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div>
                        <FormLabel>Partner</FormLabel>
                        <FormDescription>
                          Mark as a partner of the firm
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-partner"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  data-testid="button-save-team-member"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingMember
                      ? "Update Team Member"
                      : "Add Team Member"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this team member? This action cannot be undone.
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
