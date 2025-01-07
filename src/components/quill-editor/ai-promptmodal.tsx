'use client';
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "next-themes";

interface AIPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (prompt: string) => void;
    loading: boolean;
    error?: string;
    selectedText?: string;
    modalPosition: { top: number; left: number };
  }
  
  export function AIPromptModal({
    isOpen,
    onClose,
    onSubmit,
    loading,
    error,
    selectedText,
    modalPosition,
  }: AIPromptModalProps) {
    const [prompt, setPrompt] = React.useState("");
  
    const handleSubmit = () => {
      onSubmit(prompt + " context from editor: " + selectedText);
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="sm:max-w-[425px]"
          style={{ top: modalPosition.top, left: modalPosition.left, position: 'absolute' }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">AI Prompt</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write your prompt here..."
              className="min-h-[100px] resize-none"
              disabled={loading}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Close
            </Button>
            <Button onClick={handleSubmit} disabled={loading || !prompt.trim()}>
              {loading ? 'Generating...' : 'Submit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  
