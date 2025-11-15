"use client"

import { useState } from "react"
import { Camera, Plus, Search, ShoppingCart, Calendar, Sparkles, ChefHat, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Step = "home" | "scan" | "ingredients" | "recipes" | "shopping"

interface Recipe {
  id: number
  name: string
  time: string
  difficulty: "Fácil" | "Médio" | "Difícil"
  ingredients: string[]
  missing: string[]
  category: string
  servings: number
  calories: number
}

export default function Home() {
  const [step, setStep] = useState<Step>("home")
  const [ingredients, setIngredients] = useState<string[]>([])
  const [newIngredient, setNewIngredient] = useState("")
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null)
  const [filterTime, setFilterTime] = useState<string>("all")
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all")

  // Simulação de detecção de ingredientes por IA
  const simulateAIDetection = () => {
    setStep("scan")
    setTimeout(() => {
      const detected = [
        "Ovos", "Leite", "Tomate", "Queijo Mussarela", "Cebola", 
        "Alho", "Frango", "Arroz", "Feijão", "Batata"
      ]
      setIngredients(detected)
      setStep("ingredients")
    }, 2000)
  }

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()])
      setNewIngredient("")
    }
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  // Base de receitas expandida
  const allRecipes: Recipe[] = [
    {
      id: 1,
      name: "Omelete Caprese",
      time: "15 min",
      difficulty: "Fácil",
      ingredients: ["Ovos", "Tomate", "Queijo Mussarela"],
      missing: [],
      category: "Café da Manhã",
      servings: 2,
      calories: 280
    },
    {
      id: 2,
      name: "Frango Grelhado com Legumes",
      time: "30 min",
      difficulty: "Fácil",
      ingredients: ["Frango", "Tomate", "Cebola", "Alho"],
      missing: ["Pimentão"],
      category: "Almoço",
      servings: 4,
      calories: 350
    },
    {
      id: 3,
      name: "Arroz com Feijão Tropeiro",
      time: "45 min",
      difficulty: "Médio",
      ingredients: ["Arroz", "Feijão", "Ovos", "Cebola", "Alho"],
      missing: ["Bacon", "Farinha de Mandioca"],
      category: "Almoço",
      servings: 6,
      calories: 420
    },
    {
      id: 4,
      name: "Batata Gratinada",
      time: "50 min",
      difficulty: "Médio",
      ingredients: ["Batata", "Leite", "Queijo Mussarela"],
      missing: ["Creme de Leite"],
      category: "Jantar",
      servings: 4,
      calories: 380
    },
    {
      id: 5,
      name: "Sopa de Frango",
      time: "40 min",
      difficulty: "Fácil",
      ingredients: ["Frango", "Batata", "Cebola", "Alho"],
      missing: ["Cenoura"],
      category: "Jantar",
      servings: 6,
      calories: 220
    },
    {
      id: 6,
      name: "Quiche de Legumes",
      time: "60 min",
      difficulty: "Difícil",
      ingredients: ["Ovos", "Leite", "Queijo Mussarela", "Tomate", "Cebola"],
      missing: ["Massa Pronta"],
      category: "Almoço",
      servings: 8,
      calories: 310
    }
  ]

  // Filtrar receitas
  const filteredRecipes = allRecipes.filter(recipe => {
    const timeMatch = filterTime === "all" || 
      (filterTime === "quick" && parseInt(recipe.time) <= 30) ||
      (filterTime === "medium" && parseInt(recipe.time) > 30 && parseInt(recipe.time) <= 45) ||
      (filterTime === "long" && parseInt(recipe.time) > 45)
    
    const difficultyMatch = filterDifficulty === "all" || recipe.difficulty === filterDifficulty
    
    return timeMatch && difficultyMatch
  })

  // Tela inicial
  if (step === "home") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          {/* Header */}
          <div className="text-center mb-12 pt-4 sm:pt-8">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-2xl">
              <ChefHat className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Meu App Geladeira
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Seu assistente inteligente de cozinha. Fotografe sua geladeira e descubra receitas incríveis!
            </p>
          </div>

          {/* Main Action Card */}
          <div className="max-w-md mx-auto mb-12 px-4">
            <Card className="border-2 border-emerald-200 shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Começar Agora</h3>
                <p className="text-emerald-50">Capture sua geladeira com IA</p>
              </div>
              <CardContent className="p-6 sm:p-8">
                <Button 
                  onClick={simulateAIDetection}
                  className="w-full h-24 sm:h-32 text-lg sm:text-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Camera className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
                  Fotografar Geladeira
                </Button>
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-3">Ou adicione manualmente</p>
                  <Button 
                    variant="outline" 
                    onClick={() => setStep("ingredients")}
                    className="w-full border-emerald-300 hover:bg-emerald-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Ingredientes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
            <Card className="border-emerald-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-2xl flex items-center justify-center mb-3">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-base sm:text-lg">IA Avançada</CardTitle>
                <CardDescription className="text-sm">
                  Reconhecimento de alimentos e embalagens com visão computacional
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-teal-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-2xl flex items-center justify-center mb-3">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-base sm:text-lg">Receitas Inteligentes</CardTitle>
                <CardDescription className="text-sm">
                  Sugestões personalizadas baseadas no que você tem
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-emerald-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-3">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-base sm:text-lg">Lista de Compras</CardTitle>
                <CardDescription className="text-sm">
                  Integração com mercados online para comprar o que falta
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-teal-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-base sm:text-lg">Planejamento Semanal</CardTitle>
                <CardDescription className="text-sm">
                  Organize suas refeições da semana com facilidade
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="mt-16 max-w-4xl mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-2">500+</div>
                <div className="text-xs sm:text-sm text-gray-600">Receitas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-teal-600 mb-2">98%</div>
                <div className="text-xs sm:text-sm text-gray-600">Precisão IA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-2">10k+</div>
                <div className="text-xs sm:text-sm text-gray-600">Usuários</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tela de escaneamento (loading)
  if (step === "scan") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl mb-6 shadow-2xl animate-pulse">
            <Camera className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Analisando sua geladeira...</h2>
          <p className="text-gray-600 mb-8">Nossa IA está identificando os ingredientes</p>
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    )
  }

  // Tela de ingredientes
  if (step === "ingredients") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIngredients([])
                  setStep("home")
                }}
                className="mb-4 hover:bg-emerald-100"
              >
                ← Voltar
              </Button>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Seus Ingredientes
              </h2>
              <p className="text-gray-600">
                Confirme, remova ou adicione mais ingredientes
              </p>
            </div>

            {/* Ingredients Card */}
            <Card className="mb-6 shadow-xl border-2 border-emerald-100">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardTitle className="flex items-center justify-between">
                  <span>Detectados ({ingredients.length})</span>
                  <Badge className="bg-emerald-500">{ingredients.length} itens</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {ingredients.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {ingredients.map((ingredient, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="text-sm sm:text-base py-2 px-4 bg-gradient-to-r from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 cursor-pointer transition-all"
                        onClick={() => removeIngredient(index)}
                      >
                        {ingredient} ×
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nenhum ingrediente adicionado ainda</p>
                )}

                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: Cenoura, Maçã, Chocolate..."
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addIngredient()}
                    className="flex-1 border-emerald-200 focus:border-emerald-400"
                  />
                  <Button 
                    onClick={addIngredient}
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="grid sm:grid-cols-2 gap-4">
              <Button 
                onClick={() => setStep("recipes")}
                disabled={ingredients.length === 0}
                className="h-14 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
              >
                <Search className="w-5 h-5 mr-2" />
                Buscar Receitas
              </Button>
              <Button 
                variant="outline"
                onClick={simulateAIDetection}
                className="h-14 text-lg border-2 border-emerald-300 hover:bg-emerald-50"
              >
                <Camera className="w-5 h-5 mr-2" />
                Escanear Novamente
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Tela de receitas
  if (step === "recipes") {
    const completeRecipes = filteredRecipes.filter(r => r.missing.length === 0)
    const incompleteRecipes = filteredRecipes.filter(r => r.missing.length > 0)

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setStep("ingredients")}
                className="mb-4 hover:bg-emerald-100"
              >
                ← Voltar aos Ingredientes
              </Button>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                    Receitas Disponíveis
                  </h2>
                  <p className="text-gray-600">
                    Encontramos {filteredRecipes.length} receitas para você
                  </p>
                </div>
                <Button 
                  onClick={() => setStep("shopping")}
                  variant="outline"
                  className="border-2 border-emerald-300 hover:bg-emerald-50"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Lista de Compras
                </Button>
              </div>
            </div>

            {/* Filters */}
            <Card className="mb-6 shadow-lg border-emerald-100">
              <CardHeader>
                <CardTitle className="text-lg">Filtros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Tempo de Preparo</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant={filterTime === "all" ? "default" : "outline"}
                        className={`cursor-pointer ${filterTime === "all" ? "bg-emerald-500" : ""}`}
                        onClick={() => setFilterTime("all")}
                      >
                        Todos
                      </Badge>
                      <Badge 
                        variant={filterTime === "quick" ? "default" : "outline"}
                        className={`cursor-pointer ${filterTime === "quick" ? "bg-emerald-500" : ""}`}
                        onClick={() => setFilterTime("quick")}
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        Rápido (≤30min)
                      </Badge>
                      <Badge 
                        variant={filterTime === "medium" ? "default" : "outline"}
                        className={`cursor-pointer ${filterTime === "medium" ? "bg-emerald-500" : ""}`}
                        onClick={() => setFilterTime("medium")}
                      >
                        Médio (30-45min)
                      </Badge>
                      <Badge 
                        variant={filterTime === "long" ? "default" : "outline"}
                        className={`cursor-pointer ${filterTime === "long" ? "bg-emerald-500" : ""}`}
                        onClick={() => setFilterTime("long")}
                      >
                        Longo (&gt;45min)
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Dificuldade</label>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant={filterDifficulty === "all" ? "default" : "outline"}
                        className={`cursor-pointer ${filterDifficulty === "all" ? "bg-emerald-500" : ""}`}
                        onClick={() => setFilterDifficulty("all")}
                      >
                        Todas
                      </Badge>
                      <Badge 
                        variant={filterDifficulty === "Fácil" ? "default" : "outline"}
                        className={`cursor-pointer ${filterDifficulty === "Fácil" ? "bg-emerald-500" : ""}`}
                        onClick={() => setFilterDifficulty("Fácil")}
                      >
                        Fácil
                      </Badge>
                      <Badge 
                        variant={filterDifficulty === "Médio" ? "default" : "outline"}
                        className={`cursor-pointer ${filterDifficulty === "Médio" ? "bg-emerald-500" : ""}`}
                        onClick={() => setFilterDifficulty("Médio")}
                      >
                        Médio
                      </Badge>
                      <Badge 
                        variant={filterDifficulty === "Difícil" ? "default" : "outline"}
                        className={`cursor-pointer ${filterDifficulty === "Difícil" ? "bg-emerald-500" : ""}`}
                        onClick={() => setFilterDifficulty("Difícil")}
                      >
                        Difícil
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="all" className="mb-6">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-emerald-50">
                <TabsTrigger value="all">Todas ({filteredRecipes.length})</TabsTrigger>
                <TabsTrigger value="complete">Completas ({completeRecipes.length})</TabsTrigger>
                <TabsTrigger value="missing">Faltam Itens ({incompleteRecipes.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredRecipes.map((recipe) => (
                  <Card 
                    key={recipe.id}
                    className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-emerald-300"
                    onClick={() => setSelectedRecipe(selectedRecipe === recipe.id ? null : recipe.id)}
                  >
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl sm:text-2xl mb-3">{recipe.name}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="bg-emerald-50">
                              <Clock className="w-3 h-3 mr-1" />
                              {recipe.time}
                            </Badge>
                            <Badge variant="outline" className="bg-teal-50">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              {recipe.difficulty}
                            </Badge>
                            <Badge variant="outline" className="bg-blue-50">
                              👥 {recipe.servings} porções
                            </Badge>
                            <Badge variant="outline" className="bg-orange-50">
                              🔥 {recipe.calories} kcal
                            </Badge>
                            {recipe.missing.length === 0 ? (
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600">
                                ✓ Tudo disponível
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                Falta {recipe.missing.length} item(s)
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    {selectedRecipe === recipe.id && (
                      <CardContent className="border-t pt-6">
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3 text-lg">Ingredientes necessários:</h4>
                            <div className="flex flex-wrap gap-2">
                              {recipe.ingredients.map((ing, idx) => (
                                <Badge key={idx} variant="secondary" className="bg-emerald-100">
                                  ✓ {ing}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {recipe.missing.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-3 text-lg text-orange-600">
                                Faltam comprar:
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {recipe.missing.map((ing, idx) => (
                                  <Badge key={idx} className="bg-orange-100 text-orange-800">
                                    <ShoppingCart className="w-3 h-3 mr-1" />
                                    {ing}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="grid sm:grid-cols-2 gap-3">
                            <Button 
                              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                            >
                              <ChefHat className="w-4 h-4 mr-2" />
                              Ver Modo de Preparo
                            </Button>
                            <Button 
                              variant="outline"
                              className="border-2 border-emerald-300 hover:bg-emerald-50"
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              Adicionar ao Planejamento
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="complete" className="space-y-4">
                {completeRecipes.length > 0 ? (
                  completeRecipes.map((recipe) => (
                    <Card 
                      key={recipe.id} 
                      className="hover:shadow-xl transition-all duration-300 border-2 border-green-200"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-3">{recipe.name}</CardTitle>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="bg-emerald-50">
                                <Clock className="w-3 h-3 mr-1" />
                                {recipe.time}
                              </Badge>
                              <Badge variant="outline" className="bg-teal-50">
                                {recipe.difficulty}
                              </Badge>
                              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600">
                                ✓ Pronto para fazer
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                ) : (
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardContent className="py-12 text-center">
                      <p className="text-gray-500">Nenhuma receita completa com os filtros selecionados</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="missing" className="space-y-4">
                {incompleteRecipes.length > 0 ? (
                  incompleteRecipes.map((recipe) => (
                    <Card 
                      key={recipe.id} 
                      className="hover:shadow-xl transition-all duration-300 border-2 border-orange-200"
                    >
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl mb-3">{recipe.name}</CardTitle>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline" className="bg-emerald-50">
                                <Clock className="w-3 h-3 mr-1" />
                                {recipe.time}
                              </Badge>
                              <Badge variant="outline" className="bg-teal-50">
                                {recipe.difficulty}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-sm font-medium text-gray-600">Faltam:</span>
                              {recipe.missing.map((ing, idx) => (
                                <Badge key={idx} className="bg-orange-100 text-orange-800">
                                  <ShoppingCart className="w-3 h-3 mr-1" />
                                  {ing}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            className="bg-orange-500 hover:bg-orange-600 whitespace-nowrap"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Comprar Itens
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                ) : (
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardContent className="py-12 text-center">
                      <p className="text-gray-500">Nenhuma receita incompleta com os filtros selecionados</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }

  // Tela de lista de compras
  if (step === "shopping") {
    const allMissingItems = Array.from(
      new Set(allRecipes.flatMap(r => r.missing))
    )

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => setStep("recipes")}
                className="mb-4 hover:bg-emerald-100"
              >
                ← Voltar às Receitas
              </Button>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
                Lista de Compras
              </h2>
              <p className="text-gray-600">
                Itens que faltam para completar suas receitas
              </p>
            </div>

            <Card className="shadow-xl border-2 border-emerald-100">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardTitle className="flex items-center justify-between">
                  <span>Itens Necessários</span>
                  <Badge className="bg-orange-500">{allMissingItems.length} itens</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {allMissingItems.length > 0 ? (
                  <div className="space-y-3">
                    {allMissingItems.map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200"
                      >
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="w-5 h-5 text-orange-600" />
                          <span className="font-medium text-gray-800">{item}</span>
                        </div>
                        <Button 
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          Comprar Online
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <span className="text-3xl">✓</span>
                    </div>
                    <p className="text-gray-600">Você tem todos os ingredientes!</p>
                  </div>
                )}

                {allMissingItems.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <Button 
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 h-12"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Comprar Todos os Itens
                    </Button>
                    <p className="text-center text-sm text-gray-500 mt-3">
                      Integração com mercados parceiros
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return null
}
