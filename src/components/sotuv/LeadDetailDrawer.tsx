import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  LinkIcon,
} from "@heroicons/react/24/solid"
import type { Lead, StageConfig } from "@/lib/mock-data/sotuv"
import { formatAmount, getStageConfig } from "@/lib/mock-data/sotuv"
import {
  getAmoLeadDetail,
  type AmoLeadDetail,
  type CompanyDetailRendered,
  type CustomFieldRendered,
} from "@/lib/amocrm/leads"

const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return "—"
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  const day = String(d.getDate()).padStart(2, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, "0")
  const mins = String(d.getMinutes()).padStart(2, "0")
  return `${day}.${month}.${year} ${hours}:${mins}`
}

const formatFieldName = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim()
}

interface LeadDetailDrawerProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
  stageConfigs: Record<string, StageConfig>
  pipelineName: string
}

function SectionHeader({ children }: { children: string }) {
  return (
    <h3 className="text-[11px] font-bold text-[#999999] uppercase tracking-wider">
      {children}
    </h3>
  )
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span
        className="text-[12px] text-[#999999] font-medium shrink-0"
        style={{ maxWidth: "45%", wordBreak: "break-word" }}
      >
        {label}
      </span>
      <span
        className="text-[13px] text-[#141414] font-medium text-right overflow-hidden"
        style={{ maxWidth: "55%", wordBreak: "break-word" }}
      >
        {children}
      </span>
    </div>
  )
}

const PHONE_LABELS: Record<string, string> = {
  WORK: "Ish",
  WORKDD: "Ish (to'g'ri)",
  MOB: "Mobil",
  FAX: "Faks",
  HOME: "Uy",
  OTHER: "Boshqa",
}

function getPhoneLabel(enumCode: string): string {
  return PHONE_LABELS[enumCode] ?? enumCode ?? ""
}

function CustomFieldsList({ fields }: { fields: CustomFieldRendered[] }) {
  if (fields.length === 0) return null

  return (
    <>
      {fields.map((field, i) => (
        <InfoRow key={i} label={formatFieldName(field.name)}>
          {field.type === "url" ? (
            <a
              href={field.value}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline"
            >
              <LinkIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">
                {field.value.length > 30 ? field.value.slice(0, 30) + "..." : field.value}
              </span>
            </a>
          ) : (
            <span className="line-clamp-2">{field.value}</span>
          )}
        </InfoRow>
      ))}
    </>
  )
}

export function LeadDetailDrawer({
  lead,
  isOpen,
  onClose,
  stageConfigs,
  pipelineName,
}: LeadDetailDrawerProps) {
  const [detail, setDetail] = useState<AmoLeadDetail | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!lead?.amoId || !isOpen) {
      setDetail(null)
      return
    }

    async function fetchDetail() {
      setLoading(true)
      try {
        const data = await getAmoLeadDetail(lead!.amoId!)
        setDetail(data)
      } catch (err) {
        console.error("[AmoCRM] Lead detail fetch error:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [lead?.amoId, isOpen])

  useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen, onClose])

  const stageConfig = lead ? getStageConfig(stageConfigs, lead.stage) : null

  const sourceLabel =
    lead?.source === "amocrm"
      ? "AmoCRM"
      : lead?.source === "telegram"
        ? "Telegram bot"
        : "Qo'lda"

  return (
    <AnimatePresence>
      {isOpen && lead && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: 420 }}
            animate={{ x: 0 }}
            exit={{ x: 420 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[420px] bg-white border-l border-[#F0F0F0] z-50 flex flex-col shadow-xl"
          >
            {/* SECTION 1 — Header */}
            <div className="flex items-start justify-between p-5 pb-4 border-b border-[#F0F0F0]">
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <h2 className="text-[18px] font-bold text-[#141414] leading-tight truncate">
                  {lead.name}
                </h2>
                {stageConfig && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[11px] font-bold w-fit ${stageConfig.bg} ${stageConfig.color}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${stageConfig.dot}`}
                    />
                    {stageConfig.label}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-[6px] hover:bg-[#F5F5F5] transition-colors shrink-0 ml-3"
              >
                <XMarkIcon className="w-5 h-5 text-[#999999]" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-5 h-5 border-2 border-[#141414] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  {/* SECTION 2 — Asosiy ma'lumotlar */}
                  <div className="flex flex-col gap-3">
                    <SectionHeader>Asosiy ma'lumotlar</SectionHeader>
                    <div className="flex flex-col gap-2.5 bg-[#FBFBFB] rounded-[8px] p-4">
                      <InfoRow label="Summa">
                        <span className="font-bold">
                          {formatAmount(lead.amount)}{" "}
                          <span className="text-[#999999] font-medium text-[11px]">
                            so'm
                          </span>
                        </span>
                      </InfoRow>
                      <InfoRow label="Mas'ul">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white shrink-0"
                            style={{
                              backgroundColor: lead.responsible.color,
                            }}
                          >
                            {lead.responsible.initials}
                          </div>
                          {lead.responsible.name}
                        </div>
                      </InfoRow>
                      <InfoRow label="Pipeline">{pipelineName}</InfoRow>
                      <InfoRow label="Yaratilgan">{formatDate(lead.createdAt)}</InfoRow>
                      {detail?.updatedAt && (
                        <InfoRow label="Yangilangan">
                          {formatDate(detail.updatedAt)}
                        </InfoRow>
                      )}
                      <InfoRow label="Manba">
                        {lead.source === "amocrm" ? (
                          <span className="inline-flex px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold bg-indigo-50 text-indigo-600">
                            AmoCRM
                          </span>
                        ) : (
                          sourceLabel
                        )}
                      </InfoRow>
                    </div>
                  </div>

                  {/* SECTION 3 — Lead custom fields */}
                  {detail && detail.customFields.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <SectionHeader>Qo'shimcha maydonlar</SectionHeader>
                      <div className="flex flex-col gap-2.5 bg-[#FBFBFB] rounded-[8px] p-4">
                        <CustomFieldsList fields={detail.customFields} />
                      </div>
                    </div>
                  )}

                  {/* SECTION 4 — Kontakt ma'lumotlari */}
                  <div className="flex flex-col gap-3">
                    <SectionHeader>Kontakt ma'lumotlari</SectionHeader>
                    <div className="flex flex-col gap-3 bg-[#FBFBFB] rounded-[8px] p-4">
                      {/* Quick contact (before detail loads) */}
                      {(lead.phone || lead.email) && !detail && (
                        <div className="flex flex-col gap-1.5">
                          {lead.contactName && (
                            <span className="text-[13px] font-bold text-[#141414]">
                              {lead.contactName}
                            </span>
                          )}
                          {lead.phone && (
                            <div className="flex items-center gap-2">
                              <PhoneIcon className="w-3.5 h-3.5 text-[#999999]" />
                              <a
                                href={`tel:${lead.phone}`}
                                className="text-[12px] text-[#141414] hover:underline"
                              >
                                {lead.phone}
                              </a>
                            </div>
                          )}
                          {lead.email && (
                            <div className="flex items-center gap-2">
                              <EnvelopeIcon className="w-3.5 h-3.5 text-[#999999]" />
                              <a
                                href={`mailto:${lead.email}`}
                                className="text-[12px] text-[#141414] hover:underline"
                              >
                                {lead.email}
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Full contacts from detail */}
                      {detail?.contacts.map((contact, i) => (
                        <div
                          key={i}
                          className={`flex flex-col gap-2 ${i > 0 ? "pt-2.5 border-t border-[#EBEBEB]" : ""}`}
                        >
                          <span className="text-[13px] font-bold text-[#141414]">
                            {contact.name}
                          </span>

                          {contact.phones.map((phone, pi) => (
                            <div key={`p-${pi}`} className="flex items-center gap-2">
                              <PhoneIcon className="w-3.5 h-3.5 text-[#999999] shrink-0" />
                              <a
                                href={`tel:${phone.value}`}
                                className="text-[12px] text-[#141414] hover:underline"
                              >
                                {phone.value}
                              </a>
                              {phone.enumCode && (
                                <span className="text-[10px] text-[#999999] font-medium">
                                  {getPhoneLabel(phone.enumCode)}
                                </span>
                              )}
                            </div>
                          ))}

                          {contact.emails.map((email, ei) => (
                            <div key={`e-${ei}`} className="flex items-center gap-2">
                              <EnvelopeIcon className="w-3.5 h-3.5 text-[#999999] shrink-0" />
                              <a
                                href={`mailto:${email.value}`}
                                className="text-[12px] text-[#141414] hover:underline"
                              >
                                {email.value}
                              </a>
                            </div>
                          ))}

                          {contact.customFields.length > 0 && (
                            <div className="flex flex-col gap-1.5 mt-1">
                              <CustomFieldsList fields={contact.customFields} />
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Empty state */}
                      {!lead.phone &&
                        !lead.email &&
                        (!detail || detail.contacts.length === 0) && (
                          <span className="text-[12px] text-[#999999]">
                            Kontakt ma'lumotlari topilmadi
                          </span>
                        )}
                    </div>
                  </div>

                  {/* SECTION 5 — Kompaniya */}
                  {detail?.company && (
                    <div className="flex flex-col gap-3">
                      <SectionHeader>Kompaniya</SectionHeader>
                      <div className="flex flex-col gap-2.5 bg-[#FBFBFB] rounded-[8px] p-4">
                        <div className="flex items-center gap-2.5">
                          <BuildingOfficeIcon className="w-4 h-4 text-[#999999] shrink-0" />
                          <span className="text-[13px] font-bold text-[#141414]">
                            {detail.company.name}
                          </span>
                        </div>
                        {detail.company.phone && (
                          <div className="flex items-center gap-2">
                            <PhoneIcon className="w-3.5 h-3.5 text-[#999999] shrink-0" />
                            <a
                              href={`tel:${detail.company.phone}`}
                              className="text-[12px] text-[#141414] hover:underline"
                            >
                              {detail.company.phone}
                            </a>
                          </div>
                        )}
                        {detail.company.customFields.length > 0 && (
                          <CustomFieldsList fields={detail.company.customFields} />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Company name fallback (before detail loads) */}
                  {!detail && lead.company && (
                    <div className="flex flex-col gap-3">
                      <SectionHeader>Kompaniya</SectionHeader>
                      <div className="flex flex-col gap-2.5 bg-[#FBFBFB] rounded-[8px] p-4">
                        <div className="flex items-center gap-2.5">
                          <BuildingOfficeIcon className="w-4 h-4 text-[#999999] shrink-0" />
                          <span className="text-[13px] font-bold text-[#141414]">
                            {lead.company}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SECTION 6 — Eslatmalar */}
                  {detail && detail.notes.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <SectionHeader>Eslatmalar</SectionHeader>
                      <div className="flex flex-col gap-2">
                        {detail.notes.map((note, i) => (
                          <div
                            key={i}
                            className="bg-[#FBFBFB] rounded-[8px] p-3 flex flex-col gap-1.5"
                          >
                            <p className="text-[12px] text-[#141414] leading-relaxed whitespace-pre-wrap">
                              {note.text}
                            </p>
                            <div className="flex items-center gap-2 text-[10px] text-[#999999]">
                              <span className="font-medium">
                                {note.author}
                              </span>
                              <span>·</span>
                              <span>{formatDate(note.createdAt)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SECTION 7 — Vazifalar */}
                  {detail && detail.tasks.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <SectionHeader>Vazifalar</SectionHeader>
                      <div className="flex flex-col gap-2">
                        {detail.tasks.map((task, i) => (
                          <div
                            key={i}
                            className="bg-[#FBFBFB] rounded-[8px] p-3 flex items-start gap-2.5"
                          >
                            {task.isCompleted ? (
                              <CheckCircleIcon className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            ) : (
                              <ClockIcon className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                            )}
                            <div className="flex flex-col gap-0.5">
                              <span
                                className={`text-[12px] font-medium ${task.isCompleted ? "text-[#999999] line-through" : "text-[#141414]"}`}
                              >
                                {task.text}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <CalendarIcon className="w-3 h-3 text-[#999999]" />
                                <span className="text-[10px] text-[#999999]">
                                  {formatDate(task.dueDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
