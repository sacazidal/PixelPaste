"use client";

import LoaderComponent from "@/components/loaderComponent";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { checkUserRole } from "@/utils/checkUserRole";
import { createClient } from "@/utils/supabase/client";
import { Label } from "@radix-ui/react-label";
import { Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Admin = () => {
  const supabase = createClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [websiteForm, setWebsiteForm] = useState("");
  const [complexity, setComplexity] = useState("");
  const [adaptive, setAdaptive] = useState(false);
  const [language, setLanguage] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [link, setLink] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateLayouts = async () => {
    const { user, error } = await checkUserRole("admin");

    if (error) {
      setError(error);
      return;
    }

    if (
      !title ||
      !description ||
      !websiteForm ||
      !complexity ||
      !language ||
      !link
    ) {
      setError("Все поля обязательны для заполнения");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = null;

      if (imageFile) {
        const filePath = `layouts_image/${Date.now()}_${imageFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("layouts_image")
          .upload(filePath, imageFile);

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          return;
        }

        console.log("Файл успешно загружен:", uploadData);

        const { data: urlData } = supabase.storage
          .from("layouts_image")
          .getPublicUrl(filePath);

        if (!urlData) {
          console.error("Не удалось получить публичный URL изображения");
          setError("Ошибка при получении URL изображения");
          return;
        }

        imageUrl = urlData.publicUrl;
        console.log("Изображение успешно загружено. URL:", imageUrl);
      }

      const { data: insertData, error: insertError } = await supabase
        .from("layouts")
        .insert([
          {
            title,
            description,
            image_url: imageUrl,
            website_format: websiteForm,
            complexity,
            adaptive,
            language,
            free: isFree,
            price: isFree ? "0" : price,
            user_id: user.id,
            figma_link: link,
          },
        ])
        .select();

      if (insertError) {
        console.error("Error inserting layout:", insertError);
        return;
      } else {
        console.log("Inserted layout", insertData);
        setError("");
        setTitle("");
        setDescription("");
        setImageFile(null);
        setWebsiteForm("");
        setComplexity("");
        setAdaptive(null);
        setLanguage("");
        setIsFree(null);
        setPrice("");
        setLink("");
      }
    } catch (error) {
      console.error(error);
      setError("Произошла ошибка при создании проекта");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-2xl bg-neutral-950">
        <CardHeader>
          <CardTitle>Админ панель</CardTitle>
          <CardDescription>Добавьте новый макет</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateLayouts();
            }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="title">Название</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="desc">Описание</Label>
              <Textarea
                id="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Изображение</Label>
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                accept="image/*"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="w-full p-2 text-white rounded-lg border-2 border-neutral-700 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
              >
                <Upload className="text-neutral-400" />
                <span className="text-neutral-400">
                  {imageFile ? imageFile.name : "Выберите изображение"}
                </span>
              </label>
            </div>
            <div>
              <Label htmlFor="link">Ссылка</Label>
              <Input
                id="link"
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Форма сайта</Label>
              <Select value={websiteForm} onValueChange={setWebsiteForm}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите форму сайта" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Одностраничный">Одностраничный</SelectItem>
                  <SelectItem value="Многостраничный">
                    Многостраничный
                  </SelectItem>
                  <SelectItem value="Интернет-магазин">
                    Интернет-магазин
                  </SelectItem>
                  <SelectItem value="Лендинг пейдж">Лендинг</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Сложность</Label>
              <Select value={complexity} onValueChange={setComplexity}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сложность" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Легкий">Легкий</SelectItem>
                  <SelectItem value="Средний">Средний</SelectItem>
                  <SelectItem value="Сложный">Сложный</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-x-3">
              <Label>Адаптивность</Label>
              <Switch checked={adaptive} onCheckedChange={setAdaptive} />
            </div>
            <div>
              <Label>Язык</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите язык" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RU">Русский</SelectItem>
                  <SelectItem value="EN">Английский</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-x-3">
              <Label>Бесплатно</Label>
              <Switch checked={isFree} onCheckedChange={setIsFree} />
            </div>
            {!isFree && (
              <div>
                <Label>Цена</Label>
                <Input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            )}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <div className="flex justify-between">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoaderComponent title={"Создаем макет..."} />
                ) : (
                  "Создать"
                )}
              </Button>
              <Link href="/" className="">
                <Button type="button" disabled={loading}>
                  {loading ? (
                    <LoaderComponent title={"Ливаем..."} />
                  ) : (
                    "На главную"
                  )}
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Admin;
