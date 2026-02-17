"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { ClientDetail } from "@/features/clients/mock-data";

type ClientDetailSectionsProps = {
  client: ClientDetail;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(date));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDelay(minutes: number) {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const restMinutes = minutes % 60;
  return `${hours}h ${restMinutes.toString().padStart(2, "0")}min`;
}

function formatPercent(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
}

function isAnamnesisRenewRequired(lastFilledAt: string | null) {
  if (!lastFilledAt) {
    return false;
  }

  const lastDate = new Date(lastFilledAt);
  const renewDate = new Date(lastDate);
  renewDate.setMonth(renewDate.getMonth() + 6);

  return Date.now() > renewDate.getTime();
}

export function ClientDetailSections({ client }: ClientDetailSectionsProps) {
  const [clientData, setClientData] = useState(client);
  const [isEditing, setIsEditing] = useState(false);
  const [editable, setEditable] = useState({
    firstName: client.firstName,
    lastName: client.lastName,
    birthDate: client.birthDate,
    whatsapp: client.whatsapp,
  });

  const anamnesisFilled = clientData.anamnesisStatus === "filled";
  const renewRequired = anamnesisFilled && isAnamnesisRenewRequired(clientData.anamnesisLastFilledAt);

  function startEditing() {
    setEditable({
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      birthDate: clientData.birthDate,
      whatsapp: clientData.whatsapp,
    });
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
    setEditable({
      firstName: clientData.firstName,
      lastName: clientData.lastName,
      birthDate: clientData.birthDate,
      whatsapp: clientData.whatsapp,
    });
  }

  function saveEditing() {
    setClientData((previous) => ({
      ...previous,
      firstName: editable.firstName.trim(),
      lastName: editable.lastName.trim(),
      birthDate: editable.birthDate,
      whatsapp: editable.whatsapp.trim(),
    }));
    setIsEditing(false);
  }

  return (
    <div className="motion-stagger space-y-5">
      <Card className="rounded-3xl border-primary/15 bg-card/90 shadow-none">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-primary">Dados da cliente</CardTitle>
          <CardDescription className="text-primary/70">
            Campos editaveis: nome, sobrenome, data de nascimento e WhatsApp.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-primary md:grid-cols-2">
          <div>
            <span className="block text-sm text-muted-foreground">Nome</span>
            {isEditing ? (
              <Input
                value={editable.firstName}
                onChange={(event) => setEditable((prev) => ({ ...prev, firstName: event.target.value }))}
                className="mt-1 h-10 rounded-xl border-primary/20 bg-background/70 text-primary focus-visible:ring-primary/20"
              />
            ) : (
              <p>{clientData.firstName}</p>
            )}
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Sobrenome</span>
            {isEditing ? (
              <Input
                value={editable.lastName}
                onChange={(event) => setEditable((prev) => ({ ...prev, lastName: event.target.value }))}
                className="mt-1 h-10 rounded-xl border-primary/20 bg-background/70 text-primary focus-visible:ring-primary/20"
              />
            ) : (
              <p>{clientData.lastName}</p>
            )}
          </div>
          <div>
            <span className="block text-sm text-muted-foreground">Data de nascimento</span>
            {isEditing ? (
              <Input
                type="date"
                value={editable.birthDate}
                onChange={(event) => setEditable((prev) => ({ ...prev, birthDate: event.target.value }))}
                className="mt-1 h-10 rounded-xl border-primary/20 bg-background/70 text-primary focus-visible:ring-primary/20"
              />
            ) : (
              <p>{formatDate(clientData.birthDate)}</p>
            )}
          </div>
          <p>
            <span className="block text-sm text-muted-foreground">WhatsApp</span>
            {isEditing ? (
              <Input
                value={editable.whatsapp}
                onChange={(event) => setEditable((prev) => ({ ...prev, whatsapp: event.target.value }))}
                className="mt-1 h-10 rounded-xl border-primary/20 bg-background/70 text-primary focus-visible:ring-primary/20"
              />
            ) : (
              <span>{clientData.whatsapp}</span>
            )}
          </p>
          <p>
            <span className="block text-sm text-muted-foreground">Valor total gasto</span>
            {formatCurrency(clientData.totalSpent)}
          </p>
          <p>
            <span className="block text-sm text-muted-foreground">Score</span>
            {Math.max(0, Math.min(100, clientData.score))}
          </p>
          <p>
            <span className="block text-sm text-muted-foreground">Tempo medio de atraso</span>
            {formatDelay(clientData.averageDelayMinutes)}
          </p>
          <p>
            <span className="block text-sm text-muted-foreground">Taxa de cancelamento</span>
            {formatPercent(clientData.cancellationRate)}
          </p>
          <div className="md:col-span-2">
            {isEditing ? (
              <div className="space-y-2">
                <Button
                  type="button"
                  onClick={saveEditing}
                  className="h-10 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Salvar alteracoes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelEditing}
                  className="h-10 w-full rounded-xl border-primary/20 text-primary hover:bg-primary/8"
                >
                  Cancelar
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={startEditing}
                className="h-10 w-full rounded-xl border-primary/20 text-primary hover:bg-primary/8"
              >
                Editar dados
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-primary/15 bg-card/90 shadow-none">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-primary">Ficha de anamnese</CardTitle>
          <CardDescription className="text-primary/70">
            Status da ficha e acesso rapido.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary/12 bg-background/70 px-4 py-3">
            <span className="text-sm text-primary/80">Status</span>
            <span
              className={
                anamnesisFilled
                  ? "rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  : "rounded-full border border-red-300/70 bg-red-50/60 px-3 py-1 text-xs font-medium text-red-700"
              }
            >
              {anamnesisFilled ? "Preenchido" : "Nao preenchido"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-primary/12 bg-background/70 px-4 py-3">
            <span className="text-sm text-primary/80">Data da ficha</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-primary">
                {clientData.anamnesisLastFilledAt
                  ? formatDate(clientData.anamnesisLastFilledAt)
                  : "Nao informada"}
              </span>
              {anamnesisFilled ? (
                <span
                  className={
                    renewRequired
                      ? "rounded-full border border-red-300/75 bg-red-50/60 px-2.5 py-1 text-[11px] font-medium text-red-700"
                      : "rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary"
                  }
                >
                  {renewRequired ? "Renovar" : "Em dia"}
                </span>
              ) : null}
            </div>
          </div>
          <div className="space-y-2">
            <Button
              type="button"
              variant={anamnesisFilled ? "outline" : "default"}
              className={
                anamnesisFilled
                  ? "h-11 w-full rounded-2xl border-primary/20 text-primary hover:bg-primary/8"
                  : "h-11 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
              }
            >
              {anamnesisFilled ? "Visualizar ficha" : "Criar ficha"}
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={!anamnesisFilled}
              className="h-11 w-full rounded-2xl border-primary/20 text-primary hover:bg-primary/8 disabled:border-primary/10 disabled:text-primary/45"
            >
              Atualizar ficha
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-primary/15 bg-card/90 shadow-none">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-primary">Historico de atendimentos</CardTitle>
          <CardDescription className="text-primary/70">
            Ultimos servicos realizados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {clientData.attendanceHistory.length === 0 ? (
            <p className="rounded-2xl border border-primary/12 bg-background/70 px-4 py-3 text-sm text-primary/70">
              Ainda nao ha atendimentos registrados para esta cliente.
            </p>
          ) : (
            clientData.attendanceHistory.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-primary/12 bg-background/70 px-4 py-3"
              >
                <p className="text-sm text-muted-foreground">{formatDate(item.date)}</p>
                <p className="text-base font-medium text-primary">{item.service}</p>
                <p className="text-sm text-primary/80">{formatCurrency(item.value)}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
