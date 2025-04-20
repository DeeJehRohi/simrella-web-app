"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight, ImageIcon } from "lucide-react";
import {
  FileImage,
  ChevronLeft,
  Bold,
  Italic,
  List,
  Underline,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";

const Toolbar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const handleAddLink = () => {
    const url = prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleAddImage = () => {
    const url = prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex gap-2 flex-wrap mb-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-orange-100" : ""}
      >
        <Bold size={16} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-orange-100" : ""}
      >
        <Italic size={16} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-orange-100" : ""}
      >
        <Underline size={16} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-orange-100" : ""}
      >
        <List size={16} />
      </Button>
      <Button variant="outline" size="sm" onClick={handleAddLink}>
        🔗
      </Button>
      <Button variant="outline" size="sm" onClick={handleAddImage}>
        <ImageIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" }) ? "bg-orange-100" : ""
        }
      >
        <AlignLeft className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" }) ? "bg-orange-100" : ""
        }
      >
        <AlignCenter className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" }) ? "bg-orange-100" : ""
        }
      >
        <AlignRight className="w-4 h-4" />
      </Button>
    </div>
  );
};


export default function CreateServiceForm() {
  const router = useRouter();
  const isEdit = false;
  const [image, setImage] = useState<File | null>(null);
  const [longTitle, setLongTitle] = useState("");
  const [shortTitle, setShortTitle] = useState("");

  const shortDescEditor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      Link.configure({
        openOnClick: true,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
  });

  const longDescEditor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      Link.configure({
        openOnClick: true,
      }),
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "",
  });


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePublish = () => {
    const shortDesc = shortDescEditor?.getHTML();
    const longDesc = longDescEditor?.getHTML();

    console.log({
      image,
      longTitle,
      shortTitle,
      shortDesc,
      longDesc,
    });

    // Submit to backend here
  };

  return (
    <div className="w-full space-y-6 bg-[#EFF4FF] font-poppins">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button className="rounded-full" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5" size={20} />
        </button>
        <h1 className="text-2xl font-semibold">
          {isEdit ? "Edit Items on services page" : "Add New Service"}
        </h1>
      </div>

      {/* Image Upload */}
      <div className="bg-white lg:w-[955px] p-6">
        <div className="mb-6 w-3/5">
          <label className="block mb-2 text-sm font-medium">Upload Image</label>
          <div className="border-2 border-dashed border-orange-300 rounded-md p-4 flex flex-col items-center text-sm text-gray-500 cursor-pointer hover:bg-orange-50 transition-colors">
            <FileImage className="w-6 h-6 mb-2 text-orange-400" />
            <span>picture</span>
            <p className="mt-2 text-xs">not more than 500kb</p>
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-4"
            />
          </div>
        </div>

        {/* Titles */}
        <div className="mb-4 w-3/5">
          <label className="block mb-1 font-medium">Long title*</label>
          <Input
            placeholder="Enter long title"
            value={longTitle}
            onChange={(e) => setLongTitle(e.target.value)}
            className="w-full border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4 w-3/5">
          <label className="block mb-1 font-medium">Short title*</label>
          <Input
            placeholder="Enter short title"
            value={shortTitle}
            onChange={(e) => setShortTitle(e.target.value)}
            className="w-full border-gray-300 rounded-md"
          />
        </div>

        {/* Short Description */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Short description*</label>
          <Toolbar editor={shortDescEditor} />
          <div className="border p-3 rounded-md min-h-[120px] bg-white">
            <EditorContent editor={shortDescEditor} />
          </div>
        </div>

        {/* Long Description */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Long description*</label>
          <Toolbar editor={longDescEditor} />
          <div className="border p-3 rounded-md min-h-[180px] bg-white">
            <EditorContent editor={longDescEditor} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
          >
            Save to draft
          </Button>
          <Button
            className="bg-[#e88c1d] hover:bg-[#cf7a13] text-white cursor-pointer"
            onClick={handlePublish}
          >
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
}
