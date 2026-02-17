"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type NextClientCardProps = {
  name: string;
  phone: string;
  age: string;
  service: string;
  scheduledAt: string;
  initialScore?: number;
};

const REFRESH_INTERVAL_MS = 10_000;
const CANCELLATION_AFTER_DELAY_PENALTY = 3;
const LATE_STEP_MS = 15 * 60_000;

function formatDelay(ms: number) {
  if (ms < 60_000) {
    return "< 1 min";
  }

  const totalMinutes = Math.floor(ms / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes} min`;
  }

  return `${hours}h ${minutes.toString().padStart(2, "0")}min`;
}

function getLatePenaltyPoints(delayMs: number) {
  if (delayMs <= 0) {
    return 0;
  }

  return Math.max(1, Math.ceil(delayMs / LATE_STEP_MS));
}

export function NextClientCard({
  name,
  phone,
  age,
  service,
  scheduledAt,
  initialScore = 100,
}: NextClientCardProps) {
  const [status, setStatus] = useState<"pending" | "started" | "cancelled">("pending");
  const [delayUntilStartMs, setDelayUntilStartMs] = useState<number | null>(null);
  const [clientScore, setClientScore] = useState(initialScore);
  const [scoreNote, setScoreNote] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<"start" | "cancel" | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, REFRESH_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, []);

  const scheduledDate = useMemo(() => new Date(scheduledAt), [scheduledAt]);
  const scheduledTimestamp = scheduledDate.getTime();
  const scheduledTimeLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Sao_Paulo",
      }).format(scheduledDate),
    [scheduledDate],
  );

  const isPending = status === "pending";
  const isStarted = status === "started";
  const isCancelled = status === "cancelled";
  const isLate = isPending && now > scheduledTimestamp;
  const pendingDelayMs = Math.max(0, now - scheduledTimestamp);
  const pendingLatePenalty = getLatePenaltyPoints(pendingDelayMs);
  const pendingCancellationImpact = pendingLatePenalty + CANCELLATION_AFTER_DELAY_PENALTY;

  function handleStartAttendance() {
    const startedAt = Date.now();
    const delay = Math.max(0, startedAt - scheduledTimestamp);

    setDelayUntilStartMs(delay);
    setScoreNote(null);
    setStatus("started");
    setNow(startedAt);
  }

  function handleCancellation() {
    const cancelledAt = Date.now();
    const delay = Math.max(0, cancelledAt - scheduledTimestamp);
    const latePenalty = getLatePenaltyPoints(delay);
    const scoreImpact = latePenalty + CANCELLATION_AFTER_DELAY_PENALTY;

    if (delay > 0) {
      setClientScore((prev) => Math.max(0, prev - scoreImpact));
      setScoreNote(
        `Score atualizado: -${scoreImpact} (${latePenalty} por atraso de ${formatDelay(delay)} + ${CANCELLATION_AFTER_DELAY_PENALTY} por desistencia).`,
      );
    } else {
      setScoreNote("Desistencia registrada sem impacto por atraso.");
    }

    setDelayUntilStartMs(delay);
    setStatus("cancelled");
    setNow(cancelledAt);
  }

  function handleConfirmAction() {
    if (pendingAction === "start") {
      handleStartAttendance();
    }

    if (pendingAction === "cancel") {
      handleCancellation();
    }

    setPendingAction(null);
  }

  return (
    <>
      <Card className="rounded-[2rem] border border-primary/15 bg-card/90 shadow-none">
        <CardHeader className="pb-1">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="pr-2 text-[1.9rem] leading-[1.05] text-primary">Proxima cliente</CardTitle>
            <div className="flex h-[4.6rem] w-[4.6rem] shrink-0 flex-col items-center justify-center gap-0.5 rounded-[1.35rem] border border-primary/14 bg-background/65 px-2 py-1.5 text-center">
              <p className="text-[10px] uppercase leading-none tracking-[0.08em] text-primary/55">Score</p>
              <p className="text-[1.7rem] font-semibold leading-[0.95] text-primary">{clientScore}</p>
            </div>
          </div>
          <p className="mt-1 text-xs text-primary/60">Atendimento agendado para hoje</p>
        </CardHeader>
        <CardContent className="space-y-4 pt-2 text-primary">
          <section className="rounded-2xl border border-primary/12 bg-background/65 px-3.5 py-3">
            <div className="flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.08em] text-primary/55">
              <span>Horario agendado</span>
              {isLate ? (
                <span className="rounded-full border border-red-300/75 bg-red-50/55 px-2 py-0.5 text-[11px] normal-case tracking-normal text-red-700">
                  Atrasada
                </span>
              ) : null}
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-primary">
              <Clock3 className="h-4 w-4 text-primary/60" />
              <p className="text-xl font-semibold leading-none">{scheduledTimeLabel}</p>
            </div>
          </section>

          <dl className="space-y-2.5 border-t border-primary/10 pt-3">
            <div className="grid grid-cols-[80px_1fr] items-baseline gap-3">
              <dt className="text-xs uppercase tracking-[0.06em] text-primary/55">Nome</dt>
              <dd className="text-base font-medium text-primary">{name}</dd>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-baseline gap-3">
              <dt className="text-xs uppercase tracking-[0.06em] text-primary/55">Telefone</dt>
              <dd className="text-base text-primary/90">{phone}</dd>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-baseline gap-3">
              <dt className="text-xs uppercase tracking-[0.06em] text-primary/55">Idade</dt>
              <dd className="text-base text-primary/90">{age}</dd>
            </div>
            <div className="grid grid-cols-[80px_1fr] items-baseline gap-3">
              <dt className="text-xs uppercase tracking-[0.06em] text-primary/55">Servico</dt>
              <dd className="text-base text-primary/90">{service}</dd>
            </div>
          </dl>

          <div className="space-y-2.5 pt-1">
            <Button
              type="button"
              onClick={() => setPendingAction("start")}
              disabled={!isPending}
              className="h-11 w-full rounded-2xl bg-primary px-5 text-primary-foreground hover:bg-primary/90 disabled:bg-primary/70"
            >
              {isStarted
                ? "Atendimento iniciado"
                : isCancelled
                  ? "Atendimento encerrado"
                  : "Iniciar atendimento"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPendingAction("cancel")}
              disabled={!isPending}
              className="h-11 w-full rounded-2xl border-red-300/80 bg-transparent px-4 text-red-700 hover:bg-red-50/55 hover:text-red-700 focus-visible:ring-red-200 disabled:border-red-200/75 disabled:text-red-400"
            >
              Desistencia
            </Button>
          </div>
          {isStarted && delayUntilStartMs !== null ? (
            <p className="rounded-xl border border-primary/10 bg-background/50 px-3 py-2 text-xs text-primary/75">
              Atraso contabilizado: {formatDelay(delayUntilStartMs)}.
            </p>
          ) : null}
          {isCancelled && scoreNote ? (
            <p className="rounded-xl border border-primary/10 bg-background/50 px-3 py-2 text-xs text-primary/75">
              {scoreNote}
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={Boolean(pendingAction)} onOpenChange={(open) => !open && setPendingAction(null)}>
        <DialogContent className="rounded-3xl border-primary/15 bg-card p-6 shadow-[0_12px_34px_rgba(59,86,77,0.18)]">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl text-primary">
              {pendingAction === "start" ? "Iniciar atendimento?" : "Confirmar desistencia?"}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed text-primary/75">
              {pendingAction === "start"
                ? isLate
                  ? `A cliente esta atrasada em ${formatDelay(pendingDelayMs)}. Deseja iniciar o atendimento agora?`
                  : "Deseja iniciar o atendimento desta cliente agora?"
                : isLate
                  ? `A desistencia vai atualizar o score em -${pendingCancellationImpact} ponto(s). Deseja continuar?`
                  : "Deseja confirmar a desistencia deste atendimento?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="rounded-2xl border-primary/20"
              onClick={() => setPendingAction(null)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirmAction}
              className={
                pendingAction === "cancel"
                  ? "rounded-2xl border border-red-300/80 bg-red-50/55 text-red-700 hover:bg-red-100/70"
                  : "rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
              }
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
