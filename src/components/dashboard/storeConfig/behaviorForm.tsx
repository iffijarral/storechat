"use client";

import { useWatch } from "react-hook-form";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField, FormItem, FormLabel,
  FormControl, FormMessage, FormDescription,
} from "@/components/ui/form";
import { Input }    from "@/components/ui/input";
import { Button }   from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { StoreConfigValues } from "@/lib/validations/storeConfig";

interface BehaviorFormProps {
  form: UseFormReturn<StoreConfigValues>;
}

export function BehaviorForm({ form }: BehaviorFormProps) {
  const questions = useWatch({
    control:      form.control,
    name:         "behavior.suggested_questions",
    defaultValue: [],
  });

  const addQuestion = () => {
    if (questions.length >= 6) return;
    form.setValue(
      "behavior.suggested_questions",
      [...questions, ""],
      { shouldValidate: true }
    );
  };

  const removeQuestion = (index: number) => {
    form.setValue(
      "behavior.suggested_questions",
      questions.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  const canAddMore = questions.length < 6;

  return (
    <div className="space-y-6 pt-4">
      <Card>
        <CardContent className="pt-6 space-y-5">

          {/* Welcome message */}
          <FormField
            control={form.control}
            name="behavior.welcome_message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Welcome Message</FormLabel>
                <FormDescription>
                  First message customers see when they open the chat.
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="Hi! How can I help you today?"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  <span className="text-xs text-muted-foreground ml-auto">
                    {field.value?.length ?? 0} / 300
                  </span>
                </div>
              </FormItem>
            )}
          />

          {/* Placeholder text */}
          <FormField
            control={form.control}
            name="behavior.placeholder_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input Placeholder</FormLabel>
                <FormDescription>
                  Hint text shown inside the message input field.
                </FormDescription>
                <FormControl>
                  <Input placeholder="Type your message..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Suggested questions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-sm font-medium leading-none">
                Suggested Questions
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Shown as action cards when the chat opens. Max 6.
              </p>
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {questions.length} / 6
            </span>
          </div>

          <div className="space-y-2 mt-4">
            {questions.length === 0 && (
              <div className="text-center py-6 text-sm text-muted-foreground border border-dashed rounded-lg">
                No questions yet. Add one below.
              </div>
            )}

            {questions.map((_, index) => (
              <div key={index} className="flex items-center gap-2 group">
                <GripVertical className="w-4 h-4 text-muted-foreground/40 flex-shrink-0 cursor-grab" />

                <FormField
                  control={form.control}
                  name={`behavior.suggested_questions.${index}`}
                  render={({ field }) => (
                    <FormItem className="flex-1 mb-0">
                      <FormControl>
                        <Input
                          placeholder={`Question ${index + 1}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeQuestion(index)}
                  aria-label={`Remove question ${index + 1}`}
                  className="flex-shrink-0 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addQuestion}
            disabled={!canAddMore}
            className="mt-4 w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            {canAddMore ? "Add Question" : "Maximum reached (6)"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}